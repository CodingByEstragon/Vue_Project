<template>
  <div class="shop-page">
    <div class="shop-header">
      <button class="filter-button">⚙️ Filter anzeigen</button>
      <div class="sort">
        <label>Sortieren nach:</label>
        <button class="sort-button">meistverkauft</button>
      </div>
    </div>

    <div class="product-grid">
      <div
        class="product-card"
        v-for="(product, index) in products"
        :key="index"
      >
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-info">
          <p class="product-brand">{{ product.brand }}</p>
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">{{ formatPrice(product.price) }}</p>
        </div>
      </div>
    </div>

    <div class="load-more-wrapper">
      <button class="load-more-button">Mehr anzeigen</button>
    </div>
  </div>
</template>

<!-- HARDGECODET DIE ARTIKEL HINZUGEFÜGT -->
<!-- <script>
export default {
  name: "ShopPage",
  data() {
    return {
      products: [
        {
          image: new URL("@/assets/1.PNG", import.meta.url).href,
          name: "Hoodi mit Kapuze - Estragon Collection",
          price: 60.0,
          brand: "Estra",
        },
        {
          image: new URL("@/assets/2.PNG", import.meta.url).href,
          name: "Sweat Pants - Estragon Collection",
          price: 50.0,
          brand: "Estra",
        },
        {
          image: new URL("@/assets/3.PNG", import.meta.url).href,
          name: "T-Shirt - Estragon Collection",
          price: 25.0,
          brand: "Estra",
        },
        {
          image: new URL("@/assets/4.PNG", import.meta.url).href,
          name: "Sweater - Estragon Collection",
          price: 55.0,
          brand: "Estra",
        },
        {
          image: new URL("@/assets/5.PNG", import.meta.url).href,
          name: "Cap - Estragon Collection",
          price: 25.0,
          brand: "Estra",
        },
      ],
    };
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(price);
    },
  },
};
</script> -->

<!-- DYNMAISCH VON DER DATENBANK DIE ARTIKEL BEZIEHEN -->
<script>
export default {
  name: "ShopPage",
  data() {
    return {
      products: [],
    };
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3001/api/articles");
      const data = await response.json();
      this.products = data.map((item) => ({
        image: item.BildURL,
        name: item.Artikelname,
        price: item.Preis,
        brand: item.Marke,
      }));
    } catch (error) {
      console.error("Fehler beim Laden der Artikel:", error);
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(price);
    },
  },
};
</script>

<style scoped>
.shop-page {
  padding: 2rem;
  font-family: sans-serif;
}

.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filter-button {
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 25px;
  padding: 0.7rem 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button:hover {
  background-color: black;
  color: white;
}

.sort {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}

.sort-button {
  background-color: transparent;
  border: 2px solid black;
  border-radius: 25px;
  padding: 0.5rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-button:hover {
  background-color: black;
  color: white;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  text-align: center;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 250px;
  height: 300px;
  object-fit: cover;
  margin: 0 auto 1rem auto;
  display: block;
  cursor: pointer;
}

.product-info {
  font-size: 0.9rem;
}

.product-brand {
  text-transform: uppercase;
  font-weight: bold;
  color: #2b2b2b99;
  margin-bottom: 0.2rem;
}

.product-name {
  font-weight: 500;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.product-price {
  font-weight: bold;
}

@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.load-more-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.load-more-button {
  background-color: white;
  color: black;
  border: 2px solid black;
  border-radius: 25px;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-button:hover {
  background-color: black;
  color: white;
}
</style>
