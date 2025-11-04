import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/Home.vue";
import CalendarViewPage from "@/pages/CalendarView.vue";
import ShopPage from "@/pages/Shop.vue";
import CartPage from "@/pages/Cart.vue";
import ContactPage from "@/pages/Contact.vue";
import FaqPage from "@/pages/Faq.vue";
import ShippingPage from "@/pages/Shipping.vue";
import RueckgabePage from "@/pages/Rueckgabe.vue";
import ZahlungPage from "@/pages/Zahlung.vue";
import ImpressumPage from "@/pages/Impressum.vue";
import DatenschutzPage from "@/pages/Datenschutz.vue";
import AgbPage from "@/pages/Agb.vue";
import WiderrufPage from "@/pages/Widerruf.vue";
import ContactinfoPage from "@/pages/Contactinformation.vue";
import LoginPage from "@/pages/authentication/Login.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/calendarView", component: CalendarViewPage },
  { path: "/shop", component: ShopPage },
  { path: "/cart", component: CartPage },
  { path: "/authentication/login", component: LoginPage },
  { path: "/contact", component: ContactPage },
  { path: "/faq", component: FaqPage },
  { path: "/shipping", component: ShippingPage },
  { path: "/rueckgabe", component: RueckgabePage },
  { path: "/zahlung", component: ZahlungPage },
  { path: "/impressum", component: ImpressumPage },
  { path: "/datenschutz", component: DatenschutzPage },
  { path: "/agb", component: AgbPage },
  { path: "/widerruf", component: WiderrufPage },
  { path: "/contactinformation", component: ContactinfoPage },
  // { path: "/authentication/code", component: CodePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
