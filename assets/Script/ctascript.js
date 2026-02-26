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