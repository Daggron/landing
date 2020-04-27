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
 * Define Global Variables
 *
 */

 // Used Intersection observer to observe the which element is appeared on the screen

const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const navItemNames = ['Home', 'About', 'Courses', 'Enroll'];
let index = 0;

/**
 * End Global Variables
 */

// Build menu by iterating through the navelements
sections.forEach(eachSection => {
  const navlistElement = ` <li class='menu__link ${eachSection.className}' data-link=${eachSection.id}><a href="#${eachSection.id}"> ${navItemNames[index]} </li> `;
  navList.insertAdjacentHTML('beforebegin', navlistElement);
  index++;
})

// Scroll to section on link click by listenting to the click-event in the navlist
navList.addEventListener('click', e => {
  e.preventDefault();
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement
  const moveToSection = document.getElementById(parent.dataset.link);
  moveToSection.scrollIntoView({block: 'end', behavior: 'smooth'});
})


const cb = values => {
  values.forEach(eachValue => {
    const navListElement = document.querySelector(`.menu__link[data-link='${eachValue.target.id}']`);
    const section = document.getElementById(eachValue.target.id)

    if (eachValue && eachValue.isIntersecting) {
      navListElement.classList.add('active')
      section.classList.add('active')
    } else {
      if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active')
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active')
      }
    }
  })
}

const config = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7,
}

const observer = new IntersectionObserver(cb, config)
sections.forEach(eachSection => {
  observer.observe(document.getElementById(eachSection.id))
})
