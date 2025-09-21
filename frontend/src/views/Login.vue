<template>
  <div class="login-page">
    <AppHeader />
    <main class="main-content">
      <div class="content-wrapper">
        <div class="auth-container">
          <h1>{{ isRegistering ? "Create Account" : "Welcome Back" }}</h1>
          <p v-if="serverMessage" :class="{ 'error-message': isError }">
            {{ serverMessage }}
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="input-group" v-if="isRegistering">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="form.name" required />
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                v-model="form.password"
                required
              />
            </div>
            <button type="submit" class="submit-button">
              {{ isRegistering ? "Register" : "Login" }}
            </button>
          </form>

          <div class="divider">OR</div>

          <button @click="loginWithGoogle">Continue with Google</button>
          <button @click="loginWithFacebook">Continue with Facebook</button>

          <p class="toggle-form">
            {{
              isRegistering
                ? "Already have an account?"
                : "Don’t have an account?"
            }}
            <a href="#" @click.prevent="toggleForm">{{
              isRegistering ? "Log In" : "Sign Up"
            }}</a>
          </p>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { playSound } from "../utils/audio";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

const router = useRouter();
const authStore = useAuthStore();

const isRegistering = ref(false);
const form = ref({
  name: "",
  email: "",
  password: "",
});

const serverMessage = ref("");
const isError = ref(false);

const toggleForm = () => {
  playSound("futuristic-click.mp3");
  isRegistering.value = !isRegistering.value;
  serverMessage.value = "";
  isError.value = false;
};

const handleSubmit = async () => {
  playSound("futuristic-click.mp3");
  serverMessage.value = "";
  isError.value = false;

  try {
    if (isRegistering.value) {
      const response = await authStore.register(form.value);
      serverMessage.value = response.data.message;
      setTimeout(() => toggleForm(), 2000);
    } else {
      await authStore.login(form.value);
      router.push("/dashboard"); // Redirect to dashboard after login
    }
  } catch (error) {
    serverMessage.value =
      error.response?.data?.message || "An unknown error occurred.";
    isError.value = true;
  }
};

const loginWithGoogle = () => {
  playSound("futuristic-click.mp3");
  setTimeout(() => {
    window.location.href = "http://localhost:3000/auth/google";
  }, 150);
};

const loginWithFacebook = () => {
  playSound("futuristic-click.mp3");
  setTimeout(() => {
    window.location.href = "http://localhost:3000/auth/facebook";
  }, 150);
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px; /* Space for fixed header */
}

.content-wrapper {
  width: 100%;
  max-width: 500px; /* This will now be respected */
  padding: 2.5rem;
  background-color: rgba(10, 10, 20, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 246, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.3);
  text-align: center;
  box-sizing: border-box; /* Ensures padding is included in the width */
}

.auth-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-group label {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #00f6ff;
}

.input-group input {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #00f6ff;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  margin-top: 1rem;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  color: #00f6ff;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #00f6ff;
}

.divider:not(:empty)::before {
  margin-right: 0.25em;
}

.divider:not(:empty)::after {
  margin-left: 0.25em;
}

.toggle-form {
  margin-top: 1rem;
}

.error-message {
  color: #ff4d4d;
  font-weight: bold;
}
</style>
