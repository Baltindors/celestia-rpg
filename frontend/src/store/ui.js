// src/store/ui.js
import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    isSplashScreenVisible: false,
    hasPlayedIntro: false, // Prevents video from playing more than once per session
  }),
  actions: {
    showSplashScreen() {
      if (!this.hasPlayedIntro) {
        this.isSplashScreenVisible = true;
      }
    },
    hideSplashScreen() {
      this.isSplashScreenVisible = false;
      this.hasPlayedIntro = true; // Mark that the intro has been played
    },
  },
});
