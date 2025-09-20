<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="social-links">
        <a
          href="https://bsky.app/profile/baltindors.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
          >Bluesky</a
        >
        <button disabled>Discord</button>
        <button disabled>Donate</button>
      </div>
      <div class="copyright">
        &copy; {{ new Date().getFullYear() }} Celestia RPG. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.app-footer {
  background-color: rgba(10, 10, 20, 0.8);
  border-top: 1px solid rgba(0, 246, 255, 0.5);
  padding: 2rem;
  text-align: center;
  color: #c0c0c0;
  width: 100%;
  box-sizing: border-box;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.social-links a,
.social-links button {
  font-family: "Orbitron", sans-serif;
  background: transparent;
  color: #00f6ff;
  border: 1px solid #00f6ff;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.social-links a:hover {
  background-color: rgba(0, 246, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 246, 255, 0.5);
}

.social-links button:disabled {
  border-color: #555;
  color: #555;
  cursor: not-allowed;
  box-shadow: none;
  background: transparent;
}

.copyright {
  font-size: 0.9rem;
}
</style>
