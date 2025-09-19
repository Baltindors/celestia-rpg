// src/App.vue
<template>
  <div id="app-container">
    <div class="content-wrapper">
      <router-view />
    </div>
    <VideoSplashScreen />
  </div>
</template>

<script>
// Make sure to import the new component
import VideoSplashScreen from "./components/VideoSplashScreen.vue";

export default {
  components: {
    VideoSplashScreen,
  },
  setup() {
    return {};
  },
};
</script>

<style>
/* Your existing styles remain unchanged */
body {
  background-image: url("https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: "Exo 2", sans-serif;
  margin: 0;
  padding: 0;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

#app-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.content-wrapper {
  width: 100%;
  padding: 2.5rem;
  max-width: 1000px;
  margin: 0 auto;
  background-color: rgba(10, 10, 20, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 246, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.3);
  text-align: center;
}

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
