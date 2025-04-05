<template>
  <div>
    <p>Authenticating...</p>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth";

export default {
  async created() {
    // Extract the "user" query parameter passed from the backend
    const query = new URLSearchParams(window.location.search);
    const userString = query.get("user");
    const authStore = useAuthStore();
    if (userString) {
      const user = JSON.parse(decodeURIComponent(userString));
      authStore.setUser(user);
      this.$router.push("/");
    } else {
      // Alternatively, try to fetch the user from the API if not passed in the URL
      await authStore.fetchUser();
      this.$router.push("/");
    }
  },
};
</script>
