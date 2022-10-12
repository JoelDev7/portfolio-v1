window.addEventListener('load', ()=> {
    toggleNavMenuVisibility();
    setSectionHeight('about');
    setSectionHeight('experience');
    // normalizeTextWidth('fullname', ['im']);
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
    section.style.height = (windowHeight - pageHeaderHeight)+'px'; //never forget 'px'
    section.style.marginTop = pageHeaderHeight + 'px';
}

// /**
//  * Receives a text element id, gets its width and sets that width to other text elements.
//  * @param {*} refereceTextId Id of the reference text element.
//  * @param {Array} targetText Array of ids from target text elements.
//  */
// function normalizeTextWidth(refereceTextId, targetTextId) {
//     targetTextId.forEach(element => {
//         document.getElementById(element).style.width = document.getElementById(refereceTextId).clientWidth + 'px';
//     });
// }
