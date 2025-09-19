<template>
  <div class="game-card" @click="$emit('card-click')">
    <div v-if="image" class="card-image-container">
      <img :src="image" :alt="title" class="card-image" />
    </div>
    <div class="card-content">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-if="description" class="card-description">{{ description }}</p>

      <slot name="details"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

defineEmits(["card-click"]);
</script>

<style scoped>
.game-card {
  border: 2px solid #00f6ff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(10, 25, 47, 0.7);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute content and push title/desc to bottom */
}
.game-card:hover {
  background-color: rgba(0, 246, 255, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0, 246, 255, 0.5);
}
.card-image-container {
  width: 100%;
  height: 200px; /* INCREASED HEIGHT to show more of the image */
  overflow: hidden;
  display: flex; /* Use flex to center image if it's smaller than container */
  justify-content: center;
  align-items: center;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the container without distortion */
  object-position: top; /* Focus the top part of the image (where heads usually are) */
}
.card-content {
  padding: 1rem;
  text-align: center; /* Center the text inside the card */
}
.card-title {
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  font-size: 1.2rem; /* Slightly larger title */
}
.card-description {
  font-size: 0.85rem; /* Slightly smaller description */
  color: #c0c0c0;
  margin: 0;
}
</style>
