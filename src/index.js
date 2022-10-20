let viewportHeight = getWindowHeight();
let viewportWidth = getWindowWidth();

/**
 * Sets sections height and event listenners after the page is loaded.
 */
window.addEventListener('load', ()=> {
    toggleNavMenuVisibility();
    setSectionHeight('about');
    setSectionHeight('experience');
    setSectionHeight('projects');
    setSectionHeight('contact');
    setIntroFontSize();
});

/**
 * Changes sections height when device orientation changes or browser window is resized;
 */
window.addEventListener('resize', ()=> {
    // Line 21 is to avoid unnecessary resizing when browsing on mobile devices.
    if(getResizeHeightDifference()> 200){
    setSectionHeight('about');
    setSectionHeight('experience');
    setSectionHeight('projects');
    setSectionHeight('contact');
    setIntroFontSize();
    viewportHeight = getWindowHeight();
    }
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
 * Dynamically sets section minHeight according to viewport height and header height.
 * @param {*} sectionName 
 */
function setSectionHeight(sectionName) {
    const section = document.getElementById(sectionName);
    const windowHeight = getWindowHeight();
    const pageHeaderHeight = document.getElementById('pageHeader').clientHeight;
    section.style.minHeight = (windowHeight - pageHeaderHeight)+'px'; //never forget 'px'
    section.style.marginTop = pageHeaderHeight + 'px';
}

/**
 * @returns The viewport height in pixels.
 */
function getWindowHeight() {
    return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
}

/**
 * @returns The viewport width in pixels.
 */
function getWindowWidth() {
return isNaN(window.innerWidth) ? window.clientWidth: window.innerWidth;
}

/**
 * Sets personalized font size for about section in regular and small screens.
 */
function setIntroFontSize() {
    const windowWidth = getWindowWidth();
    if (windowWidth> 639) {
        document.getElementById('greeting').style.fontSize = '2vw';
        document.getElementById('name').style.fontSize = '6.8vw';
        document.getElementById('role').style.fontSize = '2.5vw';
    }else {
        document.getElementById('greeting').style.fontSize = '5vw';
        document.getElementById('name').style.fontSize = '12vw';
        document.getElementById('role').style.fontSize = '5.5vw';
    }
}

/**
 * @returns The absolute difference in pixels from the initial value of the viewport minus the new one.
 */
function getResizeHeightDifference() {
    return Math.abs(viewportHeight - getWindowHeight());
}