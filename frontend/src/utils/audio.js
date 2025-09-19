// src/utils/audio.js

const clickSound = new Audio();
let isPlaying = false;

export async function playSound(soundFile) {
  if (isPlaying) return;

  try {
    isPlaying = true;

    // This path correctly points to the file in the 'public' folder.
    const soundUrl = `/sounds/${soundFile}`;

    if (clickSound.src !== soundUrl) {
      clickSound.src = soundUrl;
    }

    await clickSound.play();
  } catch (error) {
    // <-- The missing brace is now added
    console.error(`Error playing sound: ${soundFile}`, error);
  } finally {
    isPlaying = false;
  }
}
