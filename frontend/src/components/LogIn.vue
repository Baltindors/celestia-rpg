<template>
  <div class="login">
    <h2>Login</h2>
    <button @click="loginWithGoogle">Login with Google</button>
    <button @click="loginWithFacebook">Login with Facebook</button>
  </div>
</template>

<script setup>
function loginWithGoogle() {
  window.location.href = "http://localhost:3000/auth/google";
}

function loginWithFacebook() {
  window.location.href = "http://localhost:3000/auth/facebook";
}
</script>

<style scoped>
/* Add your styles here */
</style>
