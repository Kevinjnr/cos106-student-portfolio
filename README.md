# COS 106 – Student Portfolio and Academic Management Website

My term project for COS 106 – Introduction to Web Technologies at Miva Open University. It's a personal portfolio site with an academic planner for keeping track of tasks, built with plain HTML, CSS and JavaScript.

## Pages

- **Home** – introduction, photo and a short bio
- **About Me** – education, career goals, skills and hobbies
- **Projects** – three projects with descriptions, images and links
- **Planner** – add, complete and delete academic tasks, with a progress bar
- **Contact** – a validated contact form that sends messages through Formspree

## Files

```
index.html      Home page
about.html      About Me page
projects.html   Projects page
planner.html    Academic Planner page
contact.html    Contact page
css/style.css   The one stylesheet for the whole site
js/main.js      Code used on every page (mobile menu, greeting, footer year, scroll effects)
js/planner.js   Planner code (add / complete / delete tasks, progress bar)
js/contact.js   Contact form validation and sending
images/         Photo, project screenshots and the tab icon
videos/         Intro video
audio/          Audio message
```

## Where each requirement is covered

| Requirement | Where |
|---|---|
| Homepage: name, photo, welcome, nav, bio | `index.html` |
| About: education, career, skills, hobbies | `about.html` |
| Projects: 3 projects, descriptions, images, links | `projects.html` |
| Planner: add, complete, delete tasks (JS) | `planner.html` + `js/planner.js` |
| Contact form + JS validation | `contact.html` + `js/contact.js` |
| Semantic HTML | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` on every page |
| Forms | `contact.html`, `planner.html` |
| Tables | `about.html` (Educational Background) |
| Images | `index.html`, `projects.html` |
| Hyperlinks | Navigation menu, buttons, `contact.html` |
| Lists | Navigation menu, `about.html` (skills + hobbies), planner task list |
| Multimedia | `index.html` (video), `about.html` (audio) |
| External CSS | `css/style.css` |
| Responsive / mobile-friendly | `style.css` section 13 |
| Flexbox and Grid | `style.css` sections 3, 5, 6, 8, 9, 10 |
| Navigation styling | `style.css` section 3 |
| Animations / transitions | `style.css` section 12 (fade-in, highlighter, spinning badge, marquee, scroll reveal) + hover effects |
| Consistent colour scheme | `style.css` section 1 (light green main colour) |
| Event handling, DOM manipulation | all JS files (look for the comments) |
| Form validation | `js/contact.js` |
| Dynamic content updates | greeting + footer year + scroll reveal (`main.js`), task counter + progress bar + today's date (`planner.js`), success message (`contact.js`) |
| Arrays and functions | `js/planner.js` |
| Task management system | `js/planner.js` |

## Running it

No build step is needed. Open `index.html` in a browser, or view the live version on GitHub Pages. The site is hosted from the `main` branch, root folder.
