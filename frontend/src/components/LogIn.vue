<template>
  <div class="login">
    <h2>Login</h2>
    <button @click="loginWithGoogle">Login with Google</button>
    <button @click="loginWithFacebook">Login with Facebook</button>
  </div>
</template>

<script setup>
// Import the new playSound function
import { playSound } from "../utils/audio";

function loginWithGoogle() {
  // Play the sound
  playSound("futuristic-click.mp3");

  // Navigate after a delay
  setTimeout(() => {
    window.location.href = "http://localhost:3000/auth/google";
  }, 150);
}

function loginWithFacebook() {
  // Play the sound
  playSound("futuristic-click.mp3");

  // Navigate after a delay
  setTimeout(() => {
    window.location.href = "http://localhost:3000/auth/facebook";
  }, 150);
}
</script>

<style scoped>
/* Add your styles here */
</style>
