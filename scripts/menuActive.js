document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.nav__item');
    menuItems.forEach((menuItem) => {
        const link = menuItem.querySelector('.nav__link');
        const linkPath = link.getAttribute('href').split('/').pop(); 
        if (linkPath === path) {
            menuItem.classList.add('active'); 
        } else {
            menuItem.classList.remove('active'); 
        }
    });
});
