<template>
  <div class="empty-cart">
    <div class="emoji">☹️</div>
    <h1>Dein Warenkorb ist<br />leer.</h1>
    <router-link to="/shop" class="shop-button">Weiter shoppen</router-link>
  </div>
</template>

<script>
export default {
  name: "CartPage",
};
</script>

<style scoped>
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  font-family: "Arial", sans-serif;
}

.emoji {
  font-size: 48px;
  margin-bottom: 20px;
}

h1 {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 30px;
  line-height: 1.2;
}

.shop-button {
  padding: 12px 24px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  box-shadow: 0 0 0 1px black inset;
}

.shop-button:hover {
  background-color: black;
  color: white;
}
</style>
