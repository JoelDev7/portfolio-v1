window.addEventListener('load', ()=> {
    toggleNavVisibility();
    setAboutHeight();
});

function toggleNavVisibility() {
    const navList = document.getElementById('navList');
    const hambMenu = document.getElementById('hambMenu');
    hambMenu.addEventListener('click', () => {
        navList.classList.toggle('hidden');
    });
}

function setAboutHeight() {
    const about = document.getElementById('about');
    const windowHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    const pageHeaderHeight = document.getElementById('pageHeader').clientHeight;
    about.style.height = (windowHeight - pageHeaderHeight)+'px'; //never forget 'px'
    about.style.marginTop = pageHeaderHeight + 'px';
}