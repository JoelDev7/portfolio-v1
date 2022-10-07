window.addEventListener('load', ()=> {
    toggleNavVisibility();
});

function toggleNavVisibility() {
    const navbar = document.getElementById('navbar');
    const navList = document.getElementById('navList');
    const hambMenu = document.getElementById('hambMenu');
    hambMenu.addEventListener('click', () => {
        navList.classList.toggle('hidden');
    });
}