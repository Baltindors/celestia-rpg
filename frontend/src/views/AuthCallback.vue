<template>
  <div>
    <p>Finalizing authentication...</p>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    onMounted(async () => {
      // Because the cookie is now set, this fetch will succeed.
      await authStore.fetchUser();

      // After successfully fetching the user, navigate to the homepage.
      router.push("/");
    });

    return {};
  },
};
</script>
