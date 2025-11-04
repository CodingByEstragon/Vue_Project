<template>
  <div class="social-links">
    <a href="https://www.instagram.com/lp.estragon/" target="_blank">
      <img :src="instagramLogo" alt="Instagram" />
      <span>Instagram</span>
    </a>
    <a href="https://www.youtube.com/@Lp.estragon" target="_blank">
      <img :src="youtubeLogo" alt="YouTube" />
      <span>YouTube</span>
    </a>
    <a href="https://www.twitch.tv/lp_estragon" target="_blank">
      <img :src="twitchLogo" alt="Twitch" />
      <span>Twitch</span>
    </a>
    <a href="https://discord.com/invite/96DVSvfVtQ" target="_blank">
      <img :src="discordLogo" alt="Discord" />
      <span>Discord</span>
    </a>
  </div>

  <div class="home-wrapper">
    <!-- restlicher Inhalt bleibt unverändert -->
  </div>

  <div class="home-wrapper">
    <p class="introductiontext">
      Hallo zusammen, es freut mich, dass ich euch auf dem Weg begleiten kann,
      den ich mir selbst als Aufgabe gestellt habe: meine eigene Webseite hier
      vorzustellen, während ich zeitgleich meinem Hobby als Content Creator
      nachgehe. Solltet ihr einige Verbesserungsvorschläge haben, würde ich mich
      sehr freuen, wenn ihr mir diese entweder unter den YouTube-Kommentaren
      oder auf meinem Discord-Server mitteilt. Ich bedanke mich ganz herzlich
      bei meiner Community, die mich tatkräftig unterstützt.
    </p>

    <h1 class="information">Informationen über die Webseite</h1>

    <p class="informationtext">
      Die Webseite wird an einigen Stellen noch verbessert, und ich werde die
      Informationen hier festhalten, um euch auf dem Laufenden zu halten:
    </p>

    <ul class="info-list">
      <li>
        Auf der Seite "Zeitplan" soll eine Übersicht dargestellt werden, damit
        ihr die Streams nicht verpasst.
      </li>
      <li>
        Klickt man im Zeitplan auf ein Feld, erscheint ein Pop-up-Fenster. In
        diesem Fenster kann man die Uhrzeit "von - bis" eintragen, um
        festzulegen, wie lange der Stream dauert. Anschließend gibt es die
        Schaltflächen „Übernehmen“ und „Abbrechen“. Wird auf „Übernehmen“
        geklickt, wird der Eintrag entsprechend der Uhrzeit im Kalender
        angelegt.
      </li>
      <li>
        Optional kann man außerhalb des Kalenders ein "+ Icon" hinzufügen. Wenn
        man auf dieses Icon klickt, erscheint ebenfalls ein Pop-up-Fenster, in
        dem man Datum und Uhrzeit bearbeiten kann. Auch hier gibt es die Buttons
        „Übernehmen“ und „Abbrechen“.
      </li>
      <li>
        Das Login wird fertiggestellt, sodass sich der Benutzer über "Bei Shop
        anmelden" einloggen kann. Dabei wird er auf die Seite „/accounts/login“
        weitergeleitet, auf der er seine E-Mail-Adresse eingibt. Anschließend
        erhält er per E-Mail einen sechsstelligen Code, den er eingeben muss.
        Nach der erfolgreichen Eingabe wird er auf die Seite „/orders“
        weitergeleitet.
      </li>
      <li>
        Das Login wird fertiggestellt, sodass sich der Benutzer durch Eingabe
        seiner E-Mail-Adresse und Klick auf den "Weiter"-Button anmelden kann.
        Daraufhin wird er auf die Seite „/authentication/code“ weitergeleitet
        und gibt dort im Textfeld den sechsstelligen Code ein, den er per E-Mail
        erhalten hat. Nach der erfolgreichen Eingabe des Codes wird er auf die
        Seite „/orders“ weitergeleitet.
      </li>
      <li>
        Auf der Seite „/orders“ gibt es eine eigene Navigationsleiste (Navbar).
        Oben links wird das EstraMerch-Logo angezeigt. Wenn man auf das Logo
        klickt, gelangt man zurück zur Startseite (Homepage). Rechts daneben
        befinden sich die Menüpunkte „Einkaufen“ und „Orders“. Wenn man auf
        „Einkaufen“ klickt, wird man auf die Seite „/shop“ weitergeleitet, auf
        der man Artikel kaufen kann. Ganz rechts in der Navbar befindet sich ein
        Benutzer-Icon mit einem „pi-angle-down“-Symbol, das als ein Feld
        dargestellt wird. Wenn man darauf klickt, erscheint ein Dropdown-Menü.
        In diesem Menü wird erneut das Benutzer-Icon angezeigt, daneben steht
        die E-Mail-Adresse des Benutzers/Kunden. Darunter befindet sich ein
        grauer Trennstrich. Unter diesem Trennstrich sind im Dropdown folgende
        Punkte enthalten:
        <ul>
          <li>Profil (/profile)</li>
          <li>Einstellungen (/settings)</li>
          <li>Abmelden</li>
        </ul>
        Wenn man auf „Abmelden“ klickt, wird der Benutzer abgemeldet und auf die
        Startseite weitergeleitet.
      </li>
    </ul>
  </div>
</template>

<script>
import instagramLogo from "@/assets/instagram logo.jpeg";
import youtubeLogo from "@/assets/Youtube bild.png";
import twitchLogo from "@/assets/Twitch-logo.png";
import discordLogo from "@/assets/discord-logo.jpg"; // oder wie du die Datei benannt hast

export default {
  name: "HomePage",
  data() {
    return {
      instagramLogo,
      youtubeLogo,
      twitchLogo,
      discordLogo,
    };
  },
};
</script>

<style scoped>
.home-wrapper {
  margin: 30px;
  display: flex;
  flex-direction: column;
}

.introductiontext {
  text-align: left;
  font-size: 20px;
  margin-bottom: 30px;
}

.information {
  text-align: left;
  margin-bottom: 10px;
}

.informationtext {
  text-align: left;
  font-size: 18px;
  margin-bottom: 15px;
}

.info-list {
  margin-left: 20px;
  font-size: 18px;
  list-style-type: disc;
}

.social-links {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 2rem;
  /* margin-bottom: 2rem; */
  flex-wrap: wrap;
}

.social-links a {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  color: #000;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #0077ff;
}

.social-links img {
  width: 30px;
  height: 30px;
  object-fit: contain;
  margin-right: 0.5rem;
  border-radius: 6px;
}
</style>
