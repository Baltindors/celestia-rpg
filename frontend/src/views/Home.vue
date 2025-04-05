<template>
  <div>
    <h1>Home</h1>
    <div v-if="user">
      <p>Welcome, {{ user.name }}</p>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useAuthStore } from "../store/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    onMounted(() => {
      authStore.fetchUser();
    });
    return {
      user: authStore.$state.user,
    };
  },
};
</script>
