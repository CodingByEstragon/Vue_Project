<template>
  <div class="app-wrapper">
    <AppNavbar v-if="!isAuthPage" />
    <router-view class="main-content" />
    <AppFooter v-if="!isAuthPage" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";

// Auth-Seiten definieren
const route = useRoute();
const isAuthPage = computed(() => route.path.startsWith("/authentication"));
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* Optional: Hintergrundfarbe für Seiteninhalt */
.main-content {
  background-color: #fff;
}
</style>
