// src/utils/audio.js

// A simple function to play an audio file from the assets folder
export function playSound(soundFile) {
  try {
    // The 'new URL(path, import.meta.url)' pattern is the modern way
    // to correctly resolve asset paths in Vite-based projects like Vue 3.
    const audio = new Audio(
      new URL(`../assets/sounds/${soundFile}`, import.meta.url).href
    );
    audio.play();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}
