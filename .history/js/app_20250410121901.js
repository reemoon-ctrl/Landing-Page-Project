// Store sections in an array
const sections = Array.from(document.querySelectorAll('article'));


// Get existing navigation list or create one if it doesn't exist
//Check if .nav-link exists and is a <ul>
// Append the new navList to the header (if it was newly created)
let navList = document.querySelector('.nav-link');
if (!navList || !navList.matches('ul')) {
  navList = document.createElement('ul');
  navList.className = 'nav-link';
  const headerNavContainer = document.querySelector('.main-header > div:last-of-type');
  headerNavContainer.parentNode.insertBefore(navList, headerNavContainer);
}


// Check for existing nav links and create only missing ones
sections.forEach(section => {

  const sectionId = section.id;
  const existingNavLink = navList.querySelector(`a[href="#${sectionId}"]`);
  const sectionTitle = section.getAttribute('title');


  if (!existingNavLink) {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.href = `#${sectionId}`;
    navLink.textContent = sectionTitle || section.querySelector('h1')?.textContent || section.querySelector('h2')?.textContent || sectionId; // Use title, or fallback to headings/ID
    navItem.appendChild(navLink);
    navList.appendChild(navItem);
  }


});

// Add event listener to all links (even existing ones)
const allNavLinks = Array.from(document.querySelectorAll('.nav-link a'));
allNavLinks.forEach(link => link.addEventListener('click', smoothScroll));

//fixing the nav bar on scroll
window.add
function fixnavpar() {
  const header = document.querySelector(".main-header");
  const navBarFixedPosition = header.offsetTop;

  if (pageYOffset > navBarFixedPosition) {
    header.classList.add("fixed");
  }
  else { 
    header.classList.remove("fixed");

  }
}

// Function to smooth scrolling of nav item
function smoothScroll(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  targetElement.scrollIntoView({ behavior: 'smooth' });
}

// Function to highlight active section and nav item
function makeActive() {
  const scrollPosition = window.pageYOffset;
  const navLinks = document.querySelectorAll('.nav-link li a');
  sections.forEach((section, index) => {
    const box = section.getBoundingClientRect();
    

    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add('active');
      navLinks[index].classList.add('active-link');
    } else {
      section.classList.remove('active');
      navLinks[index].classList.remove('active-link');
    }
  });
}


document.addEventListener('scroll', makeActive);


let scrollTimeout;
document.addEventListener('scroll', () => {
  const navBar = document.querySelector('.main-header');
  navBar.style.opacity = 1;

  clearTimeout(scrollTimeout);

});

// Scroll-to-top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopButton.classList.add('scroll-to-top');
scrollToTopButton.style.display = 'none'; // Initially hidden
document.body.appendChild(scrollToTopButton);


scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Show when scrolled below the fold
window.addEventListener('scroll', () => {
  if (window.pageYOffset > window.innerHeight / 2) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

