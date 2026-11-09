/*
  =========================================================
  main.js  -  code used on EVERY page
    1. Mobile menu (hamburger button)
    2. Greeting message on the home page
    3. Footer year
    4. Header shadow when you scroll
    5. Scroll reveal animation

  PDF JavaScript requirements shown in this file:
    - Event handling          -> sections 1 and 4 (click + scroll events)
    - DOM manipulation        -> sections 1, 3 and 5 (classList, textContent)
    - Dynamic content updates -> sections 2 and 3 (greeting + year change by themselves)
    - Functions               -> the function() blocks passed to addEventListener / forEach
  =========================================================
*/

// Tell the CSS that JavaScript is running (used by the scroll reveal in style.css section 12)
document.documentElement.classList.add("js");


// ===================== 1. MOBILE MENU =====================
// Event handling + DOM manipulation

// Find the hamburger button and the list of links on the page
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Event handling - run this code every time the button is clicked
menuToggle.addEventListener("click", function () {
  // DOM MANIPULATION: add the "show" class if it's missing, remove it if it's there.
  // The CSS (section 13 in style.css) shows the menu when "show" is on.
  navLinks.classList.toggle("show");

  // "open" turns the two lines of the button into an X
  const isOpen = menuToggle.classList.toggle("open");

  // Tells screen readers whether the menu is open or closed
  menuToggle.setAttribute("aria-expanded", isOpen);
});


// ===================== 2. GREETING MESSAGE =====================
// Changes "Hello!" on the home page to Good morning / afternoon / evening

// Find the greeting text. Only the home page has it, so on other pages this is null.
const greeting = document.getElementById("greeting");

// Only run the code if the greeting exists on this page
if (greeting) {
  // Get the current hour from the computer's clock (0 to 23)
  const hour = new Date().getHours();

  // Pick the right message based on the time
  if (hour < 12) {
    greeting.textContent = "Good morning!";      // before 12pm
  } else if (hour < 17) {
    greeting.textContent = "Good afternoon!";    // 12pm to 4:59pm
  } else {
    greeting.textContent = "Good evening!";      // 5pm and later
  }
}


// ===================== 3. FOOTER YEAR =====================
// DOM manipulation
// Puts the current year in the footer so you never have to update it by hand

const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();


// ===================== 4. HEADER SHADOW ON SCROLL =====================
//  Event handling
// Adds a soft shadow under the header once you scroll down a little

const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", function () {
  // window.scrollY = how far down the page you have scrolled (in pixels)
  if (window.scrollY > 10) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
});


// ===================== 5. SCROLL REVEAL =====================
// Animations + DOM manipulation
// Every element with class="reveal" fades in when it scrolls onto the screen.

// Get ALL the elements with the "reveal" class (this gives us a list)
const revealItems = document.querySelectorAll(".reveal");

// IntersectionObserver watches elements and tells us when they appear on screen
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // isIntersecting is true when the element is visible on the screen
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");   // CSS fades it in
      observer.unobserve(entry.target);        // only animate once
    }
  });
}, { threshold: 0.15 });   // 0.15 = start when 15% of the element is visible

// Ask the observer to watch each element
revealItems.forEach(function (item) {
  observer.observe(item);
});
