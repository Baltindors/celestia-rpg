// Example in a setup() function or lifecycle hook
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/user", {
      withCredentials: true,
    });
    authStore.setUser(response.data.user);
  } catch (error) {
    console.error("User not authenticated", error);
  }
});
