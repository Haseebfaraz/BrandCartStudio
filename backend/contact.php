<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Load Dependencies (composer)
require __DIR__ . '/vendor/autoload.php';

// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
if (file_exists(__DIR__ . '/.env')) {
    $dotenv->load();
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
    exit();
}

// Load PHPMailer (Assuming Composer usage)
// Files are now loaded via vendor/autoload.php above

// Read JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit();
}

$fullName = $data['fullName'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';
$selectedServiceRaw = $data['selectedService'] ?? [];

$selectedServices = [];
if (is_array($selectedServiceRaw)) {
    foreach ($selectedServiceRaw as $service) {
        $cleaned = trim((string)$service);
        if ($cleaned !== '') {
            $selectedServices[] = $cleaned;
        }
    }
} elseif (is_string($selectedServiceRaw)) {
    $cleaned = trim($selectedServiceRaw);
    if ($cleaned !== '') {
        $selectedServices = array_filter(array_map('trim', explode(',', $cleaned)));
    }
}

$selectedServices = array_values(array_unique($selectedServices));

// Validation (Keep same as Node implementation)
if (empty($fullName) || empty($phone) || empty($email) || empty($selectedServices)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit();
}

$cleanService = implode(', ', $selectedServices);
$cleanMessage = trim($message) ?: 'No project details provided.';

$safeFullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeService = htmlspecialchars($cleanService, ENT_QUOTES, 'UTF-8');

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'] ?? 'smtp.zoho.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_USER'] ?? '';
    $mail->Password   = $_ENV['SMTP_PASS'] ?? '';
    $smtpSecure = strtolower((string)($_ENV['SMTP_SECURE'] ?? ''));
    $mail->SMTPSecure = ($smtpSecure === 'true' || $smtpSecure === 'ssl')
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int)($_ENV['SMTP_PORT'] ?? 587);

    // Recipients
    $mail->setFrom($_ENV['SMTP_USER'] ?? '', 'Arc Inventador');
    $mail->addAddress($_ENV['SMTP_USER'] ?? ''); // Recipient email

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Contact Form Submission - $fullName";
    
    $mail->Body = "
      <h2>New Contact Form Submission</h2>
            <p><strong>Full Name:</strong> $safeFullName</p>
            <p><strong>Phone:</strong> $safePhone</p>
            <p><strong>Email:</strong> $safeEmail</p>
            <p><strong>Selected Service:</strong> $safeService</p>
      <p><strong>Project Details:</strong></p>
      <p>" . nl2br(htmlspecialchars($cleanMessage)) . "</p>
    ";

    $mail->AltBody = "New lead received from contact form:\n\n" .
                     "Full Name: $fullName\n" .
                     "Phone: $phone\n" .
                     "Email: $email\n" .
                     "Selected Service: $cleanService\n\n" .
                     "Project Details:\n$cleanMessage";

    $mail->send();
    echo json_encode(["success" => true, "message" => "Contact form submitted and email sent."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email. Mailer Error: {$mail->ErrorInfo}"]);
}
?>
