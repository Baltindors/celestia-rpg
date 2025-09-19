<template>
  <div
    v-if="uiStore.isSplashScreenVisible"
    class="splash-screen"
    :class="{ fadeout: !isShowing }"
  >
    <video
      ref="videoPlayer"
      src="@/assets/videos/Celsetia_RPG_Intro.mp4"
      autoplay
      muted
      playsinline
      @ended="handleVideoEnd"
    ></video>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUiStore } from "../store/ui";

const uiStore = useUiStore();
const isShowing = ref(true);

const handleVideoEnd = () => {
  isShowing.value = false; // Start the fade-out animation
  // Wait for the animation to finish before hiding the component
  setTimeout(() => {
    uiStore.hideSplashScreen();
  }, 500); // This duration should match the CSS transition duration
};
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.5s ease-out; /* Fade-out transition */
}

.splash-screen.fadeout {
  opacity: 0;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures video covers the screen without distortion */
}
</style>
