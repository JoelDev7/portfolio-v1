let viewportHeight = getWindowHeight();
let viewportWidth = getWindowWidth();
let didScroll = false;
let scrollChecker;
let scrollTimeout;
let isActionResized = false;

/**
 * Sets sections height and event listenners after the page is loaded.
 */
window.addEventListener('load', ()=> {
    toggleNavMenuVisibility();
    sectionsHeightController(getDeviceOrientation());
    setIntroFontSize();
    scrollDetector()
    displayHeaderName();
    resetFormFields();
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


window.addEventListener('scroll', ()=> {
    didScroll = true;
    displayHeaderName();
});

window.addEventListener('beforeunload', () => {
    clearInterval(scrollChecker);
    clearTimeout(scrollTimeout);
});

/**
 * Shows an hides navigation links when browsing on small screens.
 */
function toggleNavMenuVisibility() {
    const navList = document.getElementById('navList');
    const hambMenu = document.getElementById('hambMenu');
    const linkAbout = document.getElementById('linkAbout');
    const linkExperience = document.getElementById('linkExperience');
    const linkProjects = document.getElementById('linkProjects');
    const linkContact = document.getElementById('linkContact');
    hambMenu.addEventListener('click', () => {
        navList.classList.toggle('hidden');
    });
    linkAbout.addEventListener('click', () => {
        window.location.replace('#about');
        navList.classList.toggle('hidden');
    });
    linkExperience.addEventListener('click', () => {
        window.location.replace('#experience');
        navList.classList.toggle('hidden');
    });
    linkProjects.addEventListener('click', () => {
        window.location.replace('#projects');
        navList.classList.toggle('hidden');
    });
    linkContact.addEventListener('click', () => {
        window.location.replace('#contact');
        navList.classList.toggle('hidden');
    });
}

/**
 * Shows the site name from the navbar when scrolling down to next sections.
 */
function displayHeaderName() {
    const headerName = document.getElementById('headerName');
    
    if(isInViewport(document.getElementById('name'))){
        headerName.style.visibility = 'hidden';
    }else{
        headerName.style.visibility = 'visible';
    }
}

/**
 * Dynamically sets section minHeight according to viewport height and header height.
 * @param {*} sectionName 
 * @param {boolean} navMarginActive Sets margin top for the section to avoid hiding content by the navbar.
 */
function setSectionHeight(sectionName, navPaddingActive = false) {
    const section = document.getElementById(sectionName);
    const windowHeight = getWindowHeight();
    const pageHeaderHeight = document.getElementById('pageHeader').clientHeight;
    section.style.minHeight = (windowHeight - pageHeaderHeight)+'px'; //never forget 'px'
    if (navPaddingActive) {
        section.style.paddingTop = pageHeaderHeight + 'px';
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

}
if (deviceOrientation="landscape"){
    setSectionHeight('about', true);
    setSectionHeight('experience', true);
    setSectionHeight('projects', true);

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
    const portrait = window.matchMedia("(orientation: portrait)");
    const landscape = window.matchMedia("(orientation: landscape)");
    if(portrait.matches){
        orientation = 'portrait';
    }
    if(landscape.matches) {
        orientation = 'landscape';
    }
    return orientation;
}

/**
 * Detect if the user has scrolled the page.
 */
function scrollDetector() {
    scrollChecker = setInterval(() => {
        if (didScroll) {
            contactSectionResizer();
            didScroll = false;
        }
    }, 800)
}

/**
 * Determinates if an elememt of the page is currently visible for the user.
 * @param {*} element A valid HTML element.
 * @returns true if the passed element is visible for the user and false if it is not.
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Resizes the contact form section from it's shrink height to full window height and scrolls down untill is completely visible.
 */
function contactSectionResizer() {
    if(isInViewport(document.getElementById('action'))){
        if(!isActionResized){
        setSectionHeight('contact');
        scrollTimeout = setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
            isActionResized = true;
        }, 300);
    }
    }
}

/**
 * Changes the call to action screen for the contact form.
 */
function showContactForm() {
    document.getElementById('callContainer').classList.toggle('hidden');
    document.getElementById('contactForm').classList.toggle('hidden');
}

/**
 * Sends the message from the contact form if all fields are filled correctly.
 * @param {*} event 
 */
function sendMessage(event) {   
    if (isFullNameValid() && isEmailValid() && isMessageLongEnough()){
    } else {
        event.preventDefault();
    }
}

/**
 * Shows an error message if the Full Name field is not filled correctly.
 */
function fullNameValidator() {
    if (isFullNameValid()) {
        document.getElementById('fullNameNotValid').classList.add('hidden');
    } else {
        document.getElementById('fullNameNotValid').classList.remove('hidden');
    }
}

/**
 * Shows an error message if the Email field is not filled correctly.
 */
function emailValidator() {
    if (isEmailValid()) {
        document.getElementById('emailNotValid').classList.add('hidden');
    } else {
        document.getElementById('emailNotValid').classList.remove('hidden');
    }
}

/**
 * Shows an error message if the Message field is not filled correctly.
 */
function messageValidator() {
    if (isMessageLongEnough()) {
        document.getElementById('messageNotValid').classList.add('hidden');
    } else {
        document.getElementById('messageNotValid').classList.remove('hidden');
    }
}


/**
 * @returns True if Full Name field is greater than 6 characters.
 */
function isFullNameValid() {
    return document.getElementById('fullName').value.length > 6;
}

/**
 * @returns True if Email field has an email address that matches the set Regex.
 */
function isEmailValid() {
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    return emailRegex.test(document.getElementById('email').value);
}

/**
 * @returns True if Message field is greater than 50 characters.
 */
function isMessageLongEnough() {
    return document.getElementById('message').value.length > 50;
}

/**
 * Clears any form data set by the user on each time the page is reloaded;
 */
function resetFormFields() {
    document.getElementById('fullName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('message').value = "";
}