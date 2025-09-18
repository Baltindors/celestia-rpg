<template>
  <div id="app-container">
    <router-view />
  </div>
</template>

<style>
/* Import a futuristic font from Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@400;700&display=swap");

/* Global Styles */
body {
  /* A dark, futuristic fantasy background image from a free source */
  background-image: url("https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Keeps the background static while scrolling */

  /* Set the primary fonts for the application */
  font-family: "Exo 2", sans-serif;

  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #e0e0e0; /* A light grey for better readability on a dark background */
}

#app-container {
  width: 100%;
  max-width: 550px;
  padding: 2.5rem;
  text-align: center;

  /* Crystalline / Glassmorphism Effect */
  background-color: rgba(10, 10, 20, 0.75); /* Semi-transparent dark blue */
  backdrop-filter: blur(10px); /* This creates the frosted glass effect */
  -webkit-backdrop-filter: blur(10px); /* Safari support */

  /* Futuristic Border */
  border: 1px solid rgba(0, 246, 255, 0.5); /* Glowing cyan border */
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.3); /* Outer glow */
}

/* Headings Styling */
h1,
h2 {
  font-family: "Orbitron", sans-serif; /* Use the special sci-fi font */
  color: #ffffff;
  /* Glowing text effect */
  text-shadow: 0 0 5px #ffffff, 0 0 15px #00f6ff, 0 0 25px #00f6ff;
}

/* Button Styling */
button {
  font-family: "Orbitron", sans-serif;
  background: transparent;
  color: #00f6ff; /* Bright cyan color */
  border: 2px solid #00f6ff;
  border-radius: 5px;

  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  margin: 0.75rem;

  /* A subtle glow effect */
  box-shadow: inset 0 0 10px rgba(0, 246, 255, 0.5),
    0 0 15px rgba(0, 246, 255, 0.3);

  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: rgba(0, 246, 255, 0.2);
  color: #ffffff;
  /* Intensify the glow on hover */
  box-shadow: inset 0 0 15px rgba(0, 246, 255, 0.8),
    0 0 25px rgba(0, 246, 255, 0.7);
}

/* Link Styling */
a {
  color: #ff00ff; /* A contrasting magenta for links */
  text-decoration: none;
  font-weight: bold;
  text-shadow: 0 0 10px #ff00ff;
  transition: color 0.3s ease;
}

a:hover {
  color: #ffffff;
  text-decoration: underline;
}
</style>
