<template>
  <div class="race-selection-container">
    <h1>Welcome to Elysia</h1>
    <p class="intro-text">
      Your journey begins now. Choose your race to shape your destiny.
    </p>

    <div v-if="races.length === 0">
      <p>Loading races...</p>
    </div>

    <div v-else class="races-grid">
      <div
        v-for="race in races"
        :key="race.race_name"
        class="race-card"
        :class="{
          selected: selectedRace && selectedRace.race_name === race.race_name,
        }"
        @click="selectRaceCard(race)"
      >
        <h2>{{ race.race_name }}</h2>
        <p>{{ race.kingdom }}</p>
      </div>
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
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();
const router = useRouter();

const races = computed(() => authStore.races);
const selectedRace = ref(null);
const isConfirming = ref(false);

onMounted(() => {
  authStore.fetchRaces();
});

const selectRaceCard = (race) => {
  selectedRace.value = race;
};

const confirmSelection = async () => {
  if (!selectedRace.value) return;
  isConfirming.value = true;
  try {
    await authStore.selectRace(selectedRace.value.race_name);
    router.push("/"); // Redirect to home/game dashboard on success
  } catch (error) {
    console.error("Failed to confirm race selection:", error);
    // Optionally, show an error message to the user
  } finally {
    isConfirming.value = false;
  }
};
</script>

<style scoped>
.race-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.intro-text {
  max-width: 600px;
  color: #c0c0c0;
}
.races-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 900px;
}
.race-card {
  border: 2px solid #00f6ff;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(10, 25, 47, 0.7);
}
.race-card:hover {
  background-color: rgba(0, 246, 255, 0.2);
  transform: translateY(-5px);
}
.race-card.selected {
  background-color: rgba(0, 246, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 246, 255, 0.7);
  transform: translateY(-5px);
}
.race-details {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #00f6ff;
  border-radius: 8px;
  width: 100%;
  max-width: 700px;
  background-color: rgba(0, 0, 0, 0.5);
}
.race-details h3 {
  color: #ff00ff;
}
.race-details ul {
  list-style: none;
  padding: 0;
  text-align: left;
}
.race-details li {
  margin-bottom: 0.5rem;
}
</style>
