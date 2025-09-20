<template>
  <div class="race-selection-container">
    <h1>Welcome to Celestia</h1>
    <p class="intro-text">
      Your journey begins now. Choose your race to shape your destiny.
    </p>

    <div class="race-selection-layout">
      <div v-if="races.length === 0">
        <p>Loading races...</p>
      </div>
      <div v-else class="races-grid">
        <Card
          v-for="race in races"
          :key="race.race_name"
          :title="race.race_name"
          :description="race.kingdom"
          :image="getRaceImage(race.race_name)"
          :class="{
            selected: selectedRace && selectedRace.race_name === race.race_name,
          }"
          @card-click="selectRaceCard(race)"
        />
      </div>

      <div v-if="selectedRace" class="race-details">
        <h3>{{ selectedRace.race_name }}</h3>
        <p class="description">{{ selectedRace.description }}</p>
        <h4>Bonuses:</h4>
        <ul>
          <li v-for="(bonus, key) in selectedRace.bonus" :key="key">
            <strong>{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</strong>
            {{ bonus }}
          </li>
        </ul>
        <h4>Starting Units:</h4>
        <p>{{ selectedRace.starting_units.join(", ") }}</p>
        <button @click="confirmSelection" :disabled="isConfirming">
          {{
            isConfirming
              ? "Confirming..."
              : "Choose the " + selectedRace.race_name
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { playSound } from "../utils/audio";
import Card from "../components/Card.vue";

function getRaceImages() {
  const context = require.context("../assets/images/races", false, /\.jpg$/);
  const images = {};
  context.keys().forEach((key) => {
    const raceName = key.replace("./", "").replace(".jpg", "");
    images[raceName] = context(key);
  });
  return images;
}

const raceImages = getRaceImages();
const authStore = useAuthStore();
const router = useRouter();

const races = computed(() => authStore.races);
const selectedRace = ref(null);
const isConfirming = ref(false);

onMounted(() => {
  authStore.fetchRaces();
  // Set the first race as selected by default for a better UX
  // Wait for races to load
  if (races.value.length > 0) {
    selectedRace.value = races.value[0];
  } else {
    // If races are loaded later, watch for it
    const unwatch = watch(races, (newRaces) => {
      if (newRaces.length > 0) {
        selectedRace.value = newRaces[0];
        unwatch(); // Stop watching once the first race is set
      }
    });
  }
});

const getRaceImage = (raceName) => {
  return raceImages[raceName] || "";
};

const selectRaceCard = (race) => {
  playSound("futuristic-click.mp3");
  selectedRace.value = race;
};

const confirmSelection = async () => {
  if (!selectedRace.value) return;
  playSound("futuristic-click.mp3");
  isConfirming.value = true;
  try {
    await authStore.selectRace(selectedRace.value.race_name);
    router.push("/");
  } catch (error) {
    console.error("Failed to confirm race selection:", error);
  } finally {
    isConfirming.value = false;
  }
};
</script>

<style scoped>
.content-wrapper {
  width: 100%;
  padding: 2.5rem;
  max-width: 500px; /* Login form can be narrower */
  margin: 120px auto 2rem auto; /* Margin to clear the fixed header */
  background-color: rgba(10, 10, 20, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 246, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 246, 255, 0.3);
  text-align: center;
}

.race-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 2rem; /* Ensure some padding at the bottom for scrolling */
}
.intro-text {
  max-width: 600px;
  color: #c0c0c0;
  text-align: center;
}

/* NEW: Layout for desktop (side-by-side) and mobile (stacked) */
.race-selection-layout {
  display: flex;
  flex-direction: column; /* Default to stacked on small screens */
  gap: 2rem; /* Space between grid and details */
  width: 100%;
  max-width: 1200px; /* Max width for the entire layout */
}

@media (min-width: 900px) {
  /* Apply side-by-side layout for larger screens */
  .race-selection-layout {
    flex-direction: row; /* Side-by-side */
    justify-content: center;
    align-items: flex-start; /* Align items to the top */
  }
}

.races-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  flex: 1; /* Allow grid to take available space */
}
@media (min-width: 900px) {
  .races-grid {
    grid-template-columns: repeat(
      2,
      minmax(200px, 1fr)
    ); /* Two columns on desktop */
    max-width: 500px; /* Limit width of grid to avoid stretching */
  }
}

/* Styling for the selected card state - kept the same for now */
.races-grid .selected {
  background-color: rgba(0, 246, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 246, 255, 0.7);
  transform: translateY(-5px);
}

.race-details {
  margin-top: 0; /* Reset margin from previous stacked layout */
  padding: 1.5rem;
  border: 1px solid #00f6ff;
  border-radius: 8px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 2; /* Allow details to take more space on desktop */
  max-width: 700px; /* Max width for details pane */
}
@media (min-width: 900px) {
  .race-details {
    max-width: 600px; /* Adjust max width for details next to cards */
    min-height: 500px; /* Ensure detail box has some height on desktop */
    display: flex; /* Use flex to vertically align content inside details */
    flex-direction: column;
    justify-content: space-between; /* Push button to bottom if content is short */
  }
}

.race-details h3 {
  color: #ff00ff;
  margin-top: 0;
}
.race-details ul {
  list-style: none;
  padding: 0;
  text-align: left;
}
.race-details li {
  margin-bottom: 0.5rem;
}

.race-details button {
  margin-top: 1.5rem; /* Space above the button */
}
</style>
