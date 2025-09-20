// src/App.vue
<template>
  <div id="app-container">
    <router-view />
    <VideoSplashScreen />
  </div>
</template>

<script>
import VideoSplashScreen from "./components/VideoSplashScreen.vue";

export default {
  components: {
    VideoSplashScreen,
  },
};
</script>

<style>
/* Global styles reset and base settings */
body {
  background-image: url("https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: "Exo 2", sans-serif;
  margin: 0;
  padding: 0;
  color: #e0e0e0;
  background-color: #0a0a14;
}

#app-container {
  width: 100%;
  min-height: 100vh;
  /* The flex properties that caused the issue have been removed */
}

/* Global styles for elements */
h1,
h2 {
  font-family: "Orbitron", sans-serif;
  color: #ffffff;
  text-shadow: 0 0 5px #ffffff, 0 0 15px #00f6ff, 0 0 25px #00f6ff;
}

button {
  font-family: "Orbitron", sans-serif;
  background: transparent;
  color: #00f6ff;
  border: 2px solid #00f6ff;
  border-radius: 5px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: inset 0 0 10px rgba(0, 246, 255, 0.5),
    0 0 15px rgba(0, 246, 255, 0.3);
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: rgba(0, 246, 255, 0.2);
  color: #ffffff;
  box-shadow: inset 0 0 15px rgba(0, 246, 255, 0.8),
    0 0 25px rgba(0, 246, 255, 0.7);
}

a {
  color: #ff00ff;
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
