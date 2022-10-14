window.addEventListener('load', ()=> {
    toggleNavMenuVisibility();
    setSectionHeight('about');
    setSectionHeight('experience');
    setSectionHeight('projects');
});

/**
 * Shows an hides navigation links when browsing on small screens.
 */
function toggleNavMenuVisibility() {
    const navList = document.getElementById('navList');
    const hambMenu = document.getElementById('hambMenu');
    hambMenu.addEventListener('click', () => {
        navList.classList.toggle('hidden');
    });
}
/**
 * Dynamically sets section height according to viewport height and header height.
 * @param {*} sectionName 
 */
function setSectionHeight(sectionName) {
    const section = document.getElementById(sectionName);
    const windowHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    const pageHeaderHeight = document.getElementById('pageHeader').clientHeight;
    section.style.minHeight = (windowHeight - pageHeaderHeight)+'px'; //never forget 'px'
    section.style.marginTop = pageHeaderHeight + 'px';
}
