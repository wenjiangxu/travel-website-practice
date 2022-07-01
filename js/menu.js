(function () {
    var bannerNavUl = document.getElementById('banner-nav-ul');
    var bannerNav = document.getElementById('banner-nav');
    var menus = document.querySelectorAll('.menus-box .menu');
    var bannerLis = document.querySelectorAll('#banner-nav-ul li');

    // Must use onmouseover instead of onmouseenter for event delegation since onmouseover bubbles
    bannerNavUl.onmouseover = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            // Get data-t attribute from hovered li
            var t = e.target.getAttribute('data-t');
            // Remove current class from all li elements
            for(var i = 0; i < bannerLis.length; i++) {
                bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            }
            // Add current class to hovered li
            e.target.className += ' current';
            // Find matching menu
            var themenu = document.querySelector('.menus-box .menu[data-t=' + t + ']');
            // Remove current class from all menus
            for (var i = 0; i < menus.length; i++) {
                menus[i].className = 'menu';
            }
            // Add current class to matching menu
            themenu.className = 'menu current';
        }
    }

    // Close menu when mouse leaves container
    bannerNav.onmouseleave = function () {
        for(var i = 0; i < bannerLis.length; i++) {
            bannerLis[i].className = bannerLis[i].getAttribute('data-t');
            menus[i].className = 'menu';
        }
    }

    // Add accessibility support
    const menu = document.querySelector('.menu');
    menu.setAttribute('role', 'navigation');
    menu.setAttribute('aria-label', 'Main Navigation');

    // Optimize mobile menu interaction
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        // Add keyboard support
        menuToggle.setAttribute('aria-expanded', 
            menu.classList.contains('active').toString());
    });
})();