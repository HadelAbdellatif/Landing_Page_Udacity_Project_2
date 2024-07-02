/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const listDomFragment = document.createDocumentFragment();  
const sectionsNames = document.querySelectorAll('section');
const navMenu = document.querySelector('.navbar__menu')
const listItem = document.getElementById('navbar__list');
const activeNav = document.getElementsByClassName('isActive');
const buttonBack = document.querySelector('button');
const navbarItems = [];
let scrollTimeout;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function to change the css style for navbar when scroll

function changeNavbarDesign() {
    const items = document.querySelectorAll('li');
    const scrollPosition = window.scrollY;
    if(scrollPosition > 380) {
        navMenu.style.background = '#03123F';
        for(let i = 0 ; i < items.length ; i++) {
            items[i].classList.add('scroll_menu_link');
        }
    }
    else {
        navMenu.style.background = '#fff';
        for(let i = 0 ; i < items.length ; i++){
            items[i].classList.remove('scroll_menu_link');
        }
    }
}

// Function that hide the navbar

function hideNavbar() {
    navMenu.style.display = 'none';
}

// Function that show the navbar using setTimeout

function showNavbar() {
    navMenu.style.display = 'block';
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(hideNavbar, 3000);
}

// Function to go to the top

function goToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav 

for(let i = 0 ; i < sectionsNames.length ; i++) {
    const liElement = document.createElement('li');
    liElement.innerHTML = sectionsNames[i].getAttribute('data-Nav');
    liElement.classList.add('menu__link');
    listDomFragment.appendChild(liElement);
    navbarItems.push(liElement);
}

listItem.appendChild(listDomFragment);

// Add class 'active' to section when near top of viewport 

function makeActive() {
    sectionsNames.forEach((section, index) => {
        const box = section.getBoundingClientRect();
        if (box.top <= 60 && box.bottom >= 60) {
            section.classList.add('isActive');
            navbarItems[index].classList.add('active');
        } 
        else {
            section.classList.remove('isActive');
        }
    })
}

// Scroll to anchor ID using scrollIntoView event

function handleIsActiveState(event) {
    event.preventDefault();
    const { target } = event;    
    for(let i = 0 ; i < sectionsNames.length ; i++) {
        if(target.textContent === sectionsNames[i].getAttribute('data-Nav')) {
            sectionsNames[i].classList.add('isActive');
            sectionsNames[i].scrollIntoView({ behavior: 'smooth' });
        }
        else {
            sectionsNames[i].classList.remove('isActive');
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

listItem.addEventListener('click', handleIsActiveState);

// Scroll to section on link click

document.addEventListener('scroll', () => {
    makeActive();
    changeNavbarDesign();
    showNavbar();
});

// Scroll to top on click on back button
buttonBack.addEventListener('click', goToTop);

