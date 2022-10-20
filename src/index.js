let viewportHeight = getWindowHeight();
let viewportWidth = getWindowWidth();

/**
 * Sets sections height and event listenners after the page is loaded.
 */
window.addEventListener('load', ()=> {
    toggleNavMenuVisibility();
    sectionsHeightController(getDeviceOrientation());
    setIntroFontSize();
    
});

/**
 * Changes sections height when device orientation changes or browser window is resized;
 */
window.addEventListener('resize', ()=> {
    // Next line is to avoid unnecessary resizing when browsing on mobile devices.
    if(getResizeHeightDifference()> 200){
    sectionsHeightController(getDeviceOrientation());
    setIntroFontSize();
    viewportHeight = getWindowHeight();
    }
});

window.addEventListener('orientationchange', () =>{
    sectionsHeightController(getDeviceOrientation())
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
 * @param {boolean} navMarginActive Sets margin top for the section to avoid hiding content by the navbar.
 */
function setSectionHeight(sectionName, navMarginActive = false) {
    const section = document.getElementById(sectionName);
    const windowHeight = getWindowHeight();
    const pageHeaderHeight = document.getElementById('pageHeader').clientHeight;
    section.style.minHeight = (windowHeight - pageHeaderHeight)+'px'; //never forget 'px'
    if (navMarginActive) {
        section.style.marginTop = pageHeaderHeight + 'px';
    }
}

/**
 * Encloses the height setting for each section element and also controls navbar offset when browsing on desktop.
 * @param {*} deviceOrientation when set to "portrait" eliminates margin top offset for the navbar.
 */
function sectionsHeightController(deviceOrientation) {
if (deviceOrientation = 'portrait') {   
    setSectionHeight('about', true);
    setSectionHeight('experience');
    setSectionHeight('projects');
    // setSectionHeight('contact');
}
if (deviceOrientation="landscape"){
    setSectionHeight('about', true);
    setSectionHeight('experience', true);
    setSectionHeight('projects', true);
    // setSectionHeight('contact');
}
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
        document.getElementById('name').style.fontSize = '6.6vw';
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

/**
 * 
 * @returns A string containing the device orientation.
 */
function getDeviceOrientation() {
    let orientation;
    let portrait = window.matchMedia("(orientation: portrait)");
    if(portrait.matches){
        orientation = 'portrait';
    }else {
        orientation = 'landscape';
    }
    console.log(orientation);
    return orientation;
}