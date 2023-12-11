window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.nav_main');
    var img = this.document.querySelector('.imgLogo');
    if (window.scrollY >= 100) {
        navbar.style.height = '60px';
        img.style.height = '60px';
        navbar.style.boxShadow = '0 4px 7px -5px rgba(91, 89, 89, 0.55)';
    } else {
        navbar.style.height = '80px';
        navbar.style.boxShadow = 'none';
        img.style.height = '80px';
    }
});
