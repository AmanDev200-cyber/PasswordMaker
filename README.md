Secure Password Toolkit
A client-side, privacy-focused web application to check password strength and generate a secure, non-reversible SHA-256 hash. This tool operates entirely within the user's browser, ensuring that no sensitive password data is ever transmitted or stored on any server.

Features
Real-time Strength Analysis: Get immediate feedback on your password's strength as you type.

Visual Feedback: A dynamic strength bar and a clear checklist of criteria (length, uppercase, lowercase, numbers, special characters) help users create stronger passwords.

Secure Hashing: Utilizes the browser's built-in Web Crypto API to generate a standard SHA-256 hash of the password. The hashing is deterministic, meaning the same password will always produce the same hash.

Copy to Clipboard: Easily copy the generated hash with a single click.

Toggle Password Visibility: Show or hide the password for easier typing and verification.

Responsive Design: A clean, modern "glassmorphism" interface that works seamlessly on both desktop and mobile devices.

100% Client-Side: All logic is executed in the user's browser. No password information ever leaves the local machine, guaranteeing user privacy.

How to Use
Ensure all three files (index.html, style.css, script.js) are in the same folder.

Open the index.html file in any modern web browser (like Chrome, Firefox, or Edge).

Start typing your password in the input field to see the strength analysis and the generated hash.

Project Files
index.html: Contains the HTML structure of the web page.

style.css: Provides the custom styles for the application, including the background gradient and the "glass card" effect. It works in conjunction with Tailwind CSS.

script.js: Holds all the JavaScript logic for:

Handling user input.

Evaluating password strength.

Generating the SHA-256 hash.

Updating the UI dynamically.

Managing copy-to-clipboard and password visibility features.

Technologies Used
HTML5

CSS3

Tailwind CSS (loaded via CDN)

JavaScript (ES6+)

Web Crypto API (for secure hashing)

This project serves as a practical example of client-side security tools and modern front-end development practices.
