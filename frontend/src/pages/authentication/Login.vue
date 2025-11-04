<template>
  <div class="overlay">
    <div class="login-page">
      <div class="form-wrapper">
        <router-link to="/" class="logo-link">
          <img :src="logo" alt="EstraMerch Logo" class="logo-image" />
        </router-link>
        <h2 class="subtitle">Anmelden</h2>
        <p class="description">Auswählen, wie du dich anmelden möchtest</p>

        <button class="primary-button">Bei Shop anmelden</button>

        <div class="divider">
          <span>oder</span>
        </div>

        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="E-Mail-Adresse"
          class="email-input"
        />

        <button
          class="continue-button"
          @click="handleWeiter"
          :disabled="!isValidEmail"
          :class="{ active: isValidEmail }"
        >
          Weiter
        </button>

        <div class="legal">
          <div class="legal-links">
            <a href="#">Datenschutz</a>
            <!-- <span>&nbsp;&nbsp;</span> -->
            <a href="#">Allgemeine Geschäftsbedingungen</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/EstraMerchLogo.png";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      logo,
    };
  },
  methods: {
    handleWeiter() {
      console.log("E-Mail eingegeben:", this.email);
    },
  },
  computed: {
    isValidEmail() {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(this.email);
    },
  },
};
</script>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  /* width: 100vw; */
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #000;
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}

.logo-link {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  height: 20px;
}

.logo-image {
  height: 40px;
  object-fit: contain;
}

.login-page {
  min-width: 380px;
  max-width: 20rem;
  width: 100%;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.form-wrapper {
  text-align: left; /* ✅ Inhalte linksbündig */
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 2rem;
  text-align: center; /* EstraMerch bleibt zentriert */
  margin-bottom: 1rem;
}
.subtitle {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.description {
  margin-bottom: 1rem;
}

.primary-button {
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border-radius: 8px;
  background-color: #007bff; /* Blau */
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.primary-button:hover {
  background-color: #0056b3; /* Dunkleres Blau bei Hover */
}

.email-input {
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.continue-button {
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border-radius: 8px;
  background-color: #e0e0e0; /* Standard: grau, inaktiv */
  color: #666;
  border: none;
  transition: all 0.3s ease;
}

/* Wenn Button aktiv (gültige E-Mail): */
.continue-button.active {
  background-color: #000; /* schwarz */
  color: #fff; /* weiß */
  cursor: pointer;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}
.divider span {
  padding: 0 1rem;
}

.legal {
  font-size: 0.8rem;
  color: #777;
  margin-top: 1rem;
  text-align: left; /* Links bündig mit dem Button */
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.legal-links {
  display: flex;
  gap: 0.8rem; /* Abstand zwischen den beiden Links */
  flex-wrap: wrap;
  font-size: 16px;
}

.legal a {
  /* color: #007bff; */
  text-decoration: none;
}

.legal a:hover {
  text-decoration: underline;
}
</style>
