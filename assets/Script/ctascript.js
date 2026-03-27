// Centralized Favicon Injection
(function injectFavicon() {
    const faviconConfig = [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicon_io/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon_io/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon_io/favicon-16x16.png' },
        { rel: 'manifest', href: '/assets/favicon_io/site.webmanifest' }
    ];

    faviconConfig.forEach(config => {
        const link = document.createElement('link');
        Object.keys(config).forEach(key => link.setAttribute(key, config[key]));
        document.head.appendChild(link);
    });
})();

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
             fetch('/sections/customecomercebotom.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('eCommerceGreenbg').innerHTML = data;
             });
             fetch('/sections/industrymaingreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('industrymaingreenbg').innerHTML = data;
             });
             fetch('/sections/Socialmarketinggreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('Socialmarketinggreenbg').innerHTML = data;
             });
             fetch('/sections/contactgreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('contactgreenbg').innerHTML = data;
             });
             
             fetch('/sections/shopifydevelopment.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('shopifydevelopmentgreenbg').innerHTML = data;
             });
             fetch('/sections/servicemaingreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('servicemaingreenbg').innerHTML = data;
             });
             fetch('/sections/Woocoermcegreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('Woocoermcegreenbg').innerHTML = data;
             });
             fetch('/sections/magentogreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('magentogreenbg').innerHTML = data;
             });
             
             fetch('/sections/Policies.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('Policycta').innerHTML = data;
             });
             fetch('/sections/conversationrate.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('conversationbggreen').innerHTML = data;
             });
             fetch('/sections/seogreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('Seogreenbg').innerHTML = data;
             });
             fetch('/sections/whyusgreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('Whyusbggreen').innerHTML = data;
             });
             fetch('/sections/emailGreenbg.html')
             .then(response => response.text())
             .then(data => {
                document.getElementById('emailbggreen').innerHTML = data;
             });
             fetch('/sections/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-container').innerHTML = data;
            });

            fetch('/Services/sections/services-banner.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('inner-transparent-banner').innerHTML = data;
            });
            fetch('/Services/sections/services-featured-gird.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('services-features-grid').innerHTML = data;
            });
            // fetch('/Services/services-inner-pages/sections/services-inner-banner.html')
            // .then(response => response.text())
            // .then(data => {
            //     document.getElementById('services-inner-banner').innerHTML = data;
            // });




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