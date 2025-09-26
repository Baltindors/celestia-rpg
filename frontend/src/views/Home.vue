<template>
  <div class="home-page">
    <AppHeader />

    <main>
      <section id="hero" class="hero-section">
        <div class="hero-background">
          <img
            src="@/assets/images/background_celestia.png"
            alt="Celestia landscape"
          />
        </div>
        <div class="hero-content">
          <img
            src="@/assets/images/Celestia_header.png"
            alt="Celestia Logo"
            class="hero-logo"
          />
          <h1>Forge Your Fate in the Realms of Celestia</h1>
          <p>
            Embark upon a celestial journey where the will of the gods, the rise
            of empires, and the fire of ambition shape the fate of Elysia. In
            this grand strategy RPG, your choices echo through divine halls and
            mortal realms alike.
          </p>

          <div class="hero-cta" v-if="!user">
            <router-link to="/login?action=register" class="cta-image-link">
              <img
                src="@/assets/images/home/Begin_Your_Ascension_btn.png"
                alt="Begin Your Ascension"
              />
            </router-link>
            <router-link to="/login" class="cta-image-link">
              <img
                src="@/assets/images/home/Return_to_the_Realm_btn.png"
                alt="Return to the Realm"
              />
            </router-link>
          </div>
          <div class="hero-cta" v-else>
            <router-link to="/dashboard" class="cta-button"
              >Enter the Game</router-link
            >
          </div>
        </div>
      </section>

      <section id="about" class="content-section solid-bg">
        <div class="section-container">
          <div class="text-content">
            <h2>The World of Celestia</h2>
            <p>
              In the divine realm of Elysia, where gods walk the skies and
              mortals carve their destiny beneath their gaze, the balance of
              power lies in your hands. As the ruler of a rising city-state, you
              must harness the favor of the gods, rally your chosen people, and
              master the arcane arts of strategy, war, and diplomacy.
            </p>
            <p>
              Every building, hero, relic, and divine power is represented as a
              collectible, tradable card, imbued with the essence of the
              Celestial Pantheon. Gather and upgrade your deck to evolve your
              city, empower your armies, and unlock mythical abilities drawn
              from the legacies of Aegis, Elysia, Helios, and others.
            </p>
            <p>
              Celestia-RPG is a persistent, browser-based strategy RPG where
              every decision shapes your destiny. Will you build a shining
              utopia under Solara’s light, or become a conqueror guided by the
              whispers of the fallen? The stars await your ascent.
            </p>
          </div>
          <div class="image-content">
            <div class="image-display" id="about-image"></div>
          </div>
        </div>
      </section>

      <section id="explore" class="content-section background-section">
        <div class="section-container explore-container">
          <h2>Explore the Universe</h2>
          <div class="explore-grid">
            <a
              href="https://a.co/d/0osocgg"
              target="_blank"
              rel="noopener noreferrer"
              class="explore-card"
            >
              <div class="card-image-display" id="book-cover-image"></div>
              <div class="explore-card-content">
                <h3>Read the Book Series</h3>
                <p>
                  Delve deeper into the lore that started it all. Follow the
                  epic tales of heroes and villains that shaped Celestia.
                </p>
              </div>
            </a>
            <a
              href="https://www.youtube.com/@LorekeeperOfCelestia"
              target="_blank"
              rel="noopener noreferrer"
              class="explore-card"
            >
              <div class="card-image-display" id="youtube-image"></div>
              <div class="explore-card-content">
                <h3>Watch the Lore Videos</h3>
                <p>
                  Subscribe to the Lorekeeper's channel to uncover the secrets
                  of the galaxy, its history, and its people.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="community" class="content-section solid-bg">
        <div class="section-container community-container">
          <h2>Join the Community</h2>
          <p>
            Connect with other players, discuss strategies, and stay updated on
            the latest news.
          </p>
          <div class="community-buttons">
            <a
              href="https://bsky.app/profile/baltindors.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              class="cta-button"
              >Bluesky</a
            >
            <button class="cta-button" disabled>Discord (Coming Soon)</button>
            <button class="cta-button" disabled>Donate (Support Us)</button>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../store/auth";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<style scoped>
.home-page {
  width: 100%;
}

main {
  /* Removed padding-top as hero section now manages its own spacing */
}

.hero-cta {
  display: flex;
  flex-direction: column; /* Stack buttons on mobile */
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

/* On larger screens, make them horizontal again */
@media (min-width: 768px) {
  .hero-cta {
    flex-direction: row;
    gap: 3.5rem;
  }
}

.cta-image-link img {
  width: 100%;
  max-width: 180px; /* Slightly smaller on mobile */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 100px;
}

@media (min-width: 768px) {
  .cta-image-link img {
    max-width: 200px;
  }
}

.cta-image-link:hover img {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.7);
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh; /* Use min-height to ensure it's at least screen height */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  padding: 100px 1rem 2rem 1rem; /* Added padding for content */
  box-sizing: border-box;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.hero-background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(10, 10, 20, 1) 5%,
    rgba(10, 10, 20, 0.5) 50%,
    rgba(10, 10, 20, 0.8) 100%
  );
}

.hero-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-logo {
  max-width: 90%; /* Use percentage for mobile */
  margin-bottom: 1rem;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.5);
}

@media (min-width: 768px) {
  .hero-logo {
    max-width: 600px;
  }
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .hero-content h1 {
    font-size: 3.5rem;
  }
}

.hero-content p {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 0 auto;
  color: #c0c0c0;
}

.cta-button {
  font-family: "Orbitron", sans-serif;
  background: transparent;
  color: #00f6ff;
  border: 2px solid #00f6ff;
  border-radius: 5px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  box-shadow: inset 0 0 10px rgba(0, 246, 255, 0.5),
    0 0 15px rgba(0, 246, 255, 0.3);
  transition: all 0.3s ease-in-out;
}
.cta-button:hover {
  background-color: rgba(0, 246, 255, 0.2);
  color: #ffffff;
  box-shadow: inset 0 0 15px rgba(0, 246, 255, 0.8),
    0 0 25px rgba(0, 246, 255, 0.7);
}
.cta-button.secondary {
  background-color: rgba(0, 246, 255, 0.1);
}
.cta-button:disabled {
  border-color: #555;
  color: #555;
  cursor: not-allowed;
  box-shadow: none;
  background: transparent;
}

/* General Content Section Styling */
.content-section {
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.solid-bg {
  background-color: #0a0a14;
}

.background-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/background_celestia.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: -2;
}

.background-section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 20, 0.9);
  z-index: -1;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr; /* Default to single column for mobile */
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .section-container {
    grid-template-columns: 1fr 1fr; /* Two columns for desktop */
  }
}

.section-container h2 {
  font-size: 2.5rem;
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 2rem;
}

.text-content p {
  line-height: 1.6;
  color: #c0c0c0;
  text-align: left;
}

.image-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
}

.image-display {
  width: 100%;
  height: 100%;
  min-height: 350px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  border: 1px solid rgba(0, 246, 255, 0.5);
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.2);
}

#about-image {
  background-image: url("@/assets/images/home/about-celestia.jpg");
}

/* Explore Section */
.explore-container h2 {
  text-align: center;
}
.explore-grid {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr; /* Single column on mobile */
  gap: 2rem;
}

@media (min-width: 768px) {
  .explore-grid {
    grid-template-columns: 1fr 1fr; /* Two columns on desktop */
  }
}

.explore-card {
  border: 1px solid rgba(0, 246, 255, 0.5);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: rgba(10, 25, 47, 0.7);
  display: flex;
  flex-direction: column;
}
.explore-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.5);
}

.card-image-display {
  height: 250px;
  width: 100%;
  background-size: cover;
  background-position: center;
}

#book-cover-image {
  background-image: url("@/assets/images/home/book-cover.jpg");
}

/* --- YOUTUBE IMAGE CHANGE --- */
#youtube-image {
  background-image: url("@/assets/images/home/youtube-thumbnail.jpg");
  background-size: cover;
}

/* On mobile, swap to the mobile-specific image */
@media (max-width: 768px) {
  #youtube-image {
    background-image: url("@/assets/images/home/youtube-thumbnail_mobile.png");
  }
}
/* --- END OF YOUTUBE IMAGE CHANGE --- */

.explore-card-content {
  padding: 1.5rem;
  flex-grow: 1;
}
.explore-card-content h3 {
  margin-top: 0;
  color: #ff00ff;
}
.explore-card-content p {
  color: #c0c0c0;
}

/* Community Section */
.community-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  grid-column: 1 / -1;
}
.community-buttons {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
