<template>
  <footer class="footer">
    <!-- Grauer Bereich (oberer Footer) -->
    <div class="footer-top">
      <div class="footer-column">
        <h3 class="footer-title brand">
          <router-link to="/" class="brand-link">EstraMerch</router-link>
        </h3>
      </div>

      <div class="footer-column">
        <h3 class="footer-title">Informationen</h3>
        <ul>
          <li><router-link to="/faq">FAQ</router-link></li>
          <li><router-link to="/shipping">Versand</router-link></li>
          <li><router-link to="/rueckgabe">Rückgabe</router-link></li>
          <li><router-link to="/zahlung">Zahlung</router-link></li>
          <li><router-link to="/contact">Kontakt</router-link></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3 class="footer-title">Rechtliches</h3>
        <ul>
          <li><router-link to="/impressum">Impressum</router-link></li>
          <li><router-link to="/datenschutz">Datenschutz</router-link></li>
          <li><router-link to="/agb">AGB</router-link></li>
          <li><router-link to="/widerruf">Widerruf</router-link></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3 class="footer-title">Support</h3>
        <p>
          Du brauchst Hilfe bei deiner Bestellung?<br />
          Kontaktiere uns bitte über unser <br />
          <router-link to="/contact" class="support-link"
            >Kontaktformular.</router-link
          >
        </p>
      </div>

      <div class="footer-column">
        <h3 class="footer-title">Versandarten</h3>
        <div class="shipping-icons">
          <img src="@/assets/DHL-Logo.png" alt="DHL" class="shipping-icon" />
          <img
            src="@/assets/gogreen-logo.png"
            alt="GoGreen"
            class="shipping-icon"
          />
        </div>
      </div>
    </div>

    <!-- Schwarzer Bereich (unterer Footer) -->
    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <p>© 2025 EstraMerch by Estragon</p>
        <div class="bottom-links">
          <router-link to="/widerruf">Widerrufsrecht</router-link>
          <router-link to="/datenschutz">Datenschutzerklärung</router-link>
          <router-link to="/agb">AGB</router-link>
          <router-link to="/shipping">Versand</router-link>
          <router-link to="/contactinformation"
            >Kontaktinformationen</router-link
          >
          <router-link to="/impressum">Impressum</router-link>
        </div>
      </div>
      <div class="footer-bottom-right">
        <div class="payment-icons">
          <img src="@/assets/maestro-logo.png" alt="Maestro" />
          <img src="@/assets/mastercard-logo.jpg" alt="MasterCard" />
          <img src="@/assets/googlepay.png" alt="GooglePay" />
          <img src="@/assets/applepay.png" alt="ApplePay" />
          <img src="@/assets/visa-logo.png" alt="Visa" />
          <img src="@/assets/paypal-logo.png" alt="PayPal" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background-color: #111;
  color: #fff;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2rem;
  gap: 2rem;
}

.footer-column {
  flex: 1 1 180px;
}

.footer-title.brand {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 0.8rem;
  margin-top: 10px;
  line-height: 1.2;
}

.footer-title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 0.8rem;
  font-weight: bold;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 0.5rem;
}

.footer-column ul li a {
  color: #fff;
  text-decoration: none;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}

.footer-column p {
  color: #fff;
}

.footer-bottom {
  background-color: #000;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  /* margin: 20px; */
}

.footer-bottom-left {
  flex: 1 1 60%;
  font-size: 20px;
}

.footer-bottom-left p {
  margin: 0 0 0.5rem 0;
}

.bottom-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.bottom-links a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
}

.bottom-links a:hover {
  text-decoration: underline;
}

.footer-bottom-right {
  flex: 1 1 30%;
  text-align: right;
}

.footer-bottom-right h4 {
  margin-bottom: 0.5rem;
}

.shipping-icons {
  display: flex;
  flex-direction: column;
  max-width: 180px;
}

.shipping-icon {
  width: 160px;
  height: 70px;
  object-fit: contain;
  box-sizing: border-box;
}

.payment-icons img {
  width: 30px; /* Einheitliche Breite */
  height: 22px; /* Einheitliche Höhe */
  object-fit: contain;
  background-color: #fff; /* Optional: weißer Hintergrund */
  border-radius: 6px; /* Optional: leicht abgerundete Ecken */
  padding: 4px;
  margin-left: 8px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2); /* Optional: leichte Umrandung für Kontrast */
}

.payment-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .footer-top,
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-bottom-right {
    text-align: left;
    margin-top: 1rem;
  }

  .payment-icons {
    justify-content: flex-start;
  }
}

.brand-link {
  color: #fff;
  text-decoration: none;
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

.support-link {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}
</style>
