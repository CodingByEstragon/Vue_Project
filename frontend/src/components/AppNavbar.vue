<template>
  <nav class="navbar">
    <!-- Hamburger Icon -->
    <button class="mobile-menu-icon" @click="isMobile = !isMobile">
      <i v-if="isMobile" class="pi pi-times"></i>
      <i v-else class="pi pi-bars"></i>
    </button>

    <!-- Linke Sidebar -->
    <div v-if="isMobile" class="mobile-sidebar">
      <button class="close-sidebar-btn" @click="isMobile = false">
        <i class="pi pi-times"></i>
      </button>
      <router-link to="/" class="sidebar-link" @click="isMobile = false"
        >Home</router-link
      >
      <router-link
        to="/calendarView"
        class="sidebar-link"
        @click="isMobile = false"
        >Zeitplan</router-link
      >
      <router-link to="/shop" class="sidebar-link" @click="isMobile = false"
        >Shop</router-link
      >
    </div>

    <div v-if="isMobile" class="mobile-overlay" @click="isMobile = false"></div>

    <!-- Desktop Navigation -->
    <div class="navbar-left">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/calendarView" class="nav-item">Zeitplan</router-link>
      <router-link to="/shop" class="nav-item">Shop</router-link>
    </div>

    <div class="navbar-center">
      <img class="imglogo" :src="logo" alt="Kanal-Logo" />
    </div>

    <div class="navbar-right">
      <i
        class="pi pi-search nav-icon"
        @click="showSearchSidebar = !showSearchSidebar"
      />

      <!-- Rechte Sidebar -->
      <div v-if="showSearchSidebar" class="search-sidebar">
        <button class="close-button" @click="showSearchSidebar = false">
          <i class="pi pi-times"></i>
        </button>
        <h3 class="search-title">Suche</h3>

        <div class="search-input-wrapper">
          <input
            v-model="searchQuery"
            placeholder="Durchsuchen Sie unseren Shop"
            class="search-input search-placeholder"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="clear-button"
          >
            Löschen
          </button>
        </div>

        <div class="search-results">
          <template v-if="searchQuery">
            <div v-if="filteredProducts.length">
              <h4 class="products-title">PRODUKTE</h4>
              <hr class="products-divider" />
              <div class="product-list">
                <div
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="search-result-item"
                >
                  {{ product.name }}
                </div>
              </div>
            </div>
            <div v-else class="no-results">
              <div class="emoji">☹️</div>
              <div class="no-results-message">
                Keine Ergebnisse gefunden für
                <span class="search-query-text">"{{ searchQuery }}".</span>
                <br />
              </div>
              <div class="no-results-message2">
                Überprüfe die Schreibweise oder versuche es mit einer anderen
                Suchanfrage.
              </div>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/"
              class="search-result-item"
              @click="showSearchSidebar = false"
              >Home</router-link
            >
            <router-link
              to="/calendarView"
              class="search-result-item"
              @click="showSearchSidebar = false"
              >Zeitplan</router-link
            >
            <router-link
              to="/shop"
              class="search-result-item"
              @click="showSearchSidebar = false"
              >Shop</router-link
            >
          </template>
        </div>
      </div>

      <div
        v-if="showSearchSidebar"
        class="search-overlay"
        @click="showSearchSidebar = false"
      ></div>

      <router-link to="/authentication/login" class="nav-icon-link">
        <i class="pi pi-user nav-icon" />
      </router-link>
      <router-link to="/cart" class="nav-icon-link">
        <i class="pi pi-shopping-bag nav-icon" />
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import logo from "@/assets/kanallogo.png";

const isMobile = ref(false);
const showSearchSidebar = ref(false);
const searchQuery = ref("");

// Später aus DB
const products = ref([
  { id: 1, name: "Produkt A" },
  { id: 2, name: "Produkt B" },
  { id: 3, name: "Produkt C" },
]);

const filteredProducts = computed(() => {
  if (!searchQuery.value) return [];
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  border-bottom: 1px solid slategrey;
  border-radius: 12px;
  padding: 0 20px;
  position: relative;
}

.navbar-left,
.navbar-right {
  display: flex;
  gap: 20px;
}

.close-sidebar-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 201;
}

.navbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.imglogo {
  height: 60px;
  margin-top: 2px;
  width: auto;
}

.nav-item {
  text-decoration: none;
  color: black;
  font-size: 18px;
  padding: 8px 12px;
  cursor: pointer;
}

.nav-icon {
  font-size: 22px;
  color: black;
  margin: 0 10px;
  cursor: pointer;
}

.mobile-menu-icon {
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  z-index: 101;
  cursor: pointer;
}

.search-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 200;
  transition: transform 0.3s ease-in-out;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.search-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  background-color: #f6f6f6;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 15px;
  outline: none;
  padding-right: 30px;
}

.search-placeholder::placeholder {
  color: #999;
  font-weight: normal;
}

.search-results {
  display: flex;
  flex-direction: column;
}

.search-result-item {
  font-size: 16px;
  padding: 12px 0;
  color: black;
  text-decoration: none;
  cursor: pointer;
  transition: text-decoration 0.3s ease;
}

.search-result-item:hover {
  text-decoration: underline;
}

.search-query-text {
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  vertical-align: bottom;
}

.clear-button {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
  color: #666;
  padding: 0;
  line-height: 1;
}

.clear-button:hover {
  color: #000;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
}

.products-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
  color: black;
}

.products-divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 12px;
}

.no-results {
  text-align: center;
  padding-top: 120px; /* weiter unten */
  color: #444;
  width: 60%; /* oder z.B. max-width: 400px */
  margin: 0 auto; /* zentriert */
}

.emoji {
  font-size: 32px;
  margin-bottom: 10px;
}

.no-results-message {
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5;
}

.no-results-message2 {
  font-size: 16px;
  line-height: 1.5;
}

@media screen and (max-width: 768px) {
  .navbar-left {
    display: none;
  }

  .navbar-right {
    display: flex;
    gap: 15px;
    align-items: center;
    position: relative;
    z-index: 102;
  }

  .mobile-menu-icon {
    display: block;
    position: absolute;
    top: 15px;
    left: 20px;
    z-index: 103;
  }

  .navbar-center {
    position: relative;
    transform: none;
    left: auto;
    margin: 0 auto;
  }
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 75%;
  max-width: 300px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  z-index: 150;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow-y: auto;
}

.sidebar-link {
  margin: 15px 0;
  font-size: 20px;
  text-decoration: none;
  color: black;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 190;
}
</style>
