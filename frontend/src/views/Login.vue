<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
    <button @click="loginWithFacebook">Login with Facebook</button>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithGoogle() {
      window.location.href = "http://localhost:3000/auth/google";
    },
    loginWithFacebook() {
      window.location.href = "http://localhost:3000/auth/facebook";
    },
  },
};
</script>
