 fetch('/sections/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-container').innerHTML = data;
            });
            fetch('/sections/cta.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('TransformSection').innerHTML = data;
            });

             fetch('/sections/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-container').innerHTML = data;
            });




     function toggleMenu() {
    const menu = document.getElementById("myLinks");
    const icon = document.querySelector(".hamburger");
    
    // Safety check: wait until the fetch() has actually loaded the header
    if (!menu || !icon) return; 
    
    menu.classList.toggle("active");
    icon.classList.toggle("active");
}

// 2. The Click-Outside Listener
window.addEventListener('click', function(e) {
    const menu = document.getElementById("myLinks");
    const icon = document.querySelector(".hamburger");

    // Safety check: wait until the fetch() has actually loaded the header
    if (!menu || !icon) return;

    // Check if the click was OUTSIDE the menu AND outside the hamburger icon
    if (!menu.contains(e.target) && !icon.contains(e.target)) {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            icon.classList.remove("active");
        }
    }
});       