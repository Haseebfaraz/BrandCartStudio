document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.custom-contact-form');
  const serviceSelect = document.querySelector('select[name="selected_service"]');
  const fullNameInput = form.querySelectorAll('.underline-input')[0];
  const phoneInput = form.querySelectorAll('.underline-input')[1];
  const emailInput = form.querySelectorAll('.underline-input')[2];
  const messageInput = form.querySelectorAll('.underline-input')[3];
  const submitBtn = form.querySelector('.universa-btn');

  // Validation schema
  const validationSchema = {
    fullName: {
      el: fullNameInput,
      required: true,
      message: 'Full name is required',
    },
    phone: {
      el: phoneInput,
      required: true,
      pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      message: 'Please enter a valid phone number',
    },
    email: {
      el: emailInput,
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
    selectedService: {
      el: serviceSelect,
      required: true,
      message: 'Please select a service',
    },
  };

  // Helper: create or get the error span for an element
  function getErrorSpan(el) {
    // For select inside .custom-select-wrapper, place error outside the wrapper
    const isInsideSelectWrapper = el.closest('.custom-select-wrapper');
    const container = isInsideSelectWrapper
      ? isInsideSelectWrapper.parentElement
      : el.parentElement;

    let span = container.querySelector('.field-error-msg');
    if (!span) {
      span = document.createElement('span');
      span.className = 'field-error-msg';
      span.style.cssText =
        'color:#ff4d4d;font-size:13px;display:none;margin-top:4px;font-family:"DM Sans",sans-serif;';
      container.appendChild(span);
    }
    return span;
  }

  function showError(el, message) {
    const span = getErrorSpan(el);
    span.textContent = message;
    span.style.display = 'block';
    el.style.borderColor = '#ff4d4d';
  }

  function clearError(el) {
    const span = getErrorSpan(el);
    span.style.display = 'none';
    el.style.borderColor = '';
  }

  function validateField(key) {
    const rule = validationSchema[key];
    const value = rule.el.value.trim();

    if (rule.required && !value) {
      showError(rule.el, rule.message);
      return false;
    } else if (rule.pattern && value && !rule.pattern.test(value)) {
      showError(rule.el, rule.message);
      return false;
    } else {
      clearError(rule.el);
      return true;
    }
  }

  function validateAll() {
    let valid = true;
    for (const key in validationSchema) {
      if (!validateField(key)) {
        valid = false;
      }
    }
    return valid;
  }

  // Real-time validation listeners
  for (const key in validationSchema) {
    const rule = validationSchema[key];
    const eventType = rule.el.tagName === 'SELECT' ? 'change' : 'input';
    
    rule.el.addEventListener(eventType, () => {
      validateField(key);
    });

    // Also validate on blur for better UX
    if (rule.el.tagName !== 'SELECT') {
      rule.el.addEventListener('blur', () => {
        validateField(key);
      });
    }
  }

  // Intercept submit button click
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateAll()) return;

    // Gather data
    const payload = {
      fullName: fullNameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      selectedService: serviceSelect.value,
    };

    // Disable button
    const linkEl = submitBtn.querySelector('a');
    const originalText = linkEl.textContent;
    linkEl.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(`../backend/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Thank you! Your message has been sent successfully.');
        form.reset();
        serviceSelect.selectedIndex = 0;
        // Clear all error states
        for (const key in validationSchema) {
          clearError(validationSchema[key].el);
        }
      } else {
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to connect to the server. Please try again later.');
    } finally {
      linkEl.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});
