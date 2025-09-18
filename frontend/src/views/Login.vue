<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
    <button @click="loginWithFacebook">Login with Facebook</button>
  </div>
</template>

<script>
// Import the new playSound function
import { playSound } from "../utils/audio";

export default {
  methods: {
    loginWithGoogle() {
      // Play the sound on click
      playSound("futuristic-click.wav");

      // Navigate after a short delay to allow the sound to play
      setTimeout(() => {
        window.location.href = "http://localhost:3000/auth/google";
      }, 150); // 150 milliseconds
    },
    loginWithFacebook() {
      // Play the sound on click
      playSound("futuristic-click.wav");

      setTimeout(() => {
        window.location.href = "http://localhost:3000/auth/facebook";
      }, 150);
    },
  },
};
</script>
