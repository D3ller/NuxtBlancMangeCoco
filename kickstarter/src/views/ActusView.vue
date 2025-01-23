<template>
  <div class="container">
    <Header></Header>
    <avance></avance>
    <team></team>
    <HeaderLinks></HeaderLinks>
    <div class="content">
      <h2 class="title" id="description">Les actus du projet</h2>
      <div class="news-cards">
        <div class="news-card">
          <h3>Phase de BETA</h3>
          <p>Le jeu est techniquement jouable, mais pas terminé, il faut encore peaufiner le système de tour par tour ainsi que le système de rechargement de page pour que ce dernier ne fasse pas quitter la partie en cours en cas de problèmes de connexion.De plus, il reste quelques bugs à corrigés.</p> 
          <p class="date">Publié le 20/01/2025</p>
        </div>
        <div class="news-card">
          <h3>Ajout de nouvelle cartes</h3>
          <p>De nouvelles cartes sur le thème MMI ont été ajoutées. </p>
          <p class="date">Publié le 15/01/2025</p>
        </div>
        <div class="news-card">
          <h3>Bonne année 2025 </h3>
          <p>Toute l'équipe de Banana Split vous souhaite une bonne année.</p>
          <p class="date">Publié le 01/01/2025</p>
        </div>
        <div class="news-card">
          <h3>Test fonctionnalités de gameplay</h3>
          <p>Le système de choix de cartes à été créer et retourne les bonnes données dans la console. </p>
          <p class="date">Publié le 16/12/2024</p>
        </div>
        <div class="news-card">
          <h3>Mise à jour de la base de données</h3>
          <p>La base de données à été mise à jours, de nouvelles ont été rajoutées</p>
          <p class="date">Publié le 18/11/2024</p>
        </div>
        <div class="news-card">
          <h3>Ajout du système de connexion à la salle via un QR code (prototypage et test)</h3>
          <p>Cette semaine nous avons fait des tests pour permettre aux joueurs de rejoindre la partie via un QR code présent sur une télé du couloir.</p>
          <p class="date">Publié le 01/11/2024</p>
        </div>
        <div class="news-card">
          <h3>Landing page en ligne</h3>
          <p>La landing page qui permet de mettre son pseudo et de rejoindre les salles est désormais en ligne.</p>
          <p class="date">Publié le 10/10/2024</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Avance from "@/components/avance.vue";
import Team from "@/components/team.vue";
import HeaderLinks from "@/components/HeaderLinks.vue";
</script>

<style scoped>
.container {
  padding: 20px;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
  color: var(--text-color); /* Utilise la variable existante */
}

p,
ul {
  font-size: 16px;
  line-height: 1.6;
}

ul {
  margin: 0;
  padding: 0 20px;
  list-style-type: disc;
}

/* Styles pour les cartes des avancées */
.news-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-card {
  background-color: var(--gray-color); /* Utilise la variable existante */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  max-width: 100%; /* Ensure the card does not exceed the container's width */
}

.news-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--bg-color); /* Utilise la variable existante */
}

.news-card p {
  color: var(--bg-color); /* Utilise la variable existante */
  line-height: 1.6;
}

.date {
  font-size: 14px;
  color: var(--bg-color); /* Utilise la variable existante */
}

/* Media query pour les petits écrans */
@media (max-width: 480px) {
  .title {
    font-size: 15px;
  }

  p,
  ul {
    font-size: 14px;
    line-height: 1.3;
  }

  .container {
    padding: 8px;
  }

  .news-card {
    padding: 10px;
    max-width: 100%; /* Ensure the card does not exceed the container's width */
  }

  .news-card h3 {
    font-size: 16px;
  }

  .news-card p {
    font-size: 12px;
  }
}
</style>