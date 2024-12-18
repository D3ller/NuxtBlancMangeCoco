<template>
  <div class="container">
    <Header></Header>
    <avance></avance>
    <team></team>
    <HeaderLinks></HeaderLinks>
    <div class="content">
      <h2 class="title" id="description">Les actus du projet</h2>
      <p>Banana Split révolutionne les soirées jeux entre amis avec une expérience moderne et interactive. Ce jeu
        d'ambiance, à l'humour décalé et sans limites, vous garantit des moments hilarants, tout en intégrant la
        technologie pour une expérience fluide et immersive.</p>
      <h2 class="subtitle">Avancée du projet</h2>
      <p>Semaine 1: <br>
        Nous avons donc décidé de commencer par définir le design de notre site, notamment le logo et les différentes
        couleurs que nous allions utiliser. Ensuite, nous avons commencé à créer une maquette des différentes pages que
        nous avions imaginées, telles que la page d'accueil, la barre de navigation, le pied de page, ainsi que la
        version mobile. Pendant ce temps, Corentin et Emilien ont commencé à faire des tests avec Socket.io et à
        explorer comment adapter notre jeu pour les téléphones. Nous avons aussi commencer à organiser comment allions
        mettre nos données.
        <br> <br>
        Semaine 2:<br>
        Cette semaine, nous avons réparti les tâches comme suit : Corentin s'est occupé de la création et de la
        configuration de différentes pages, tandis qu'Émilien a pris en charge la configuration de Socket.io et des
        requêtes associées. Axel a travaillé sur l'alimentation de notre base de données à l'aide du jeu, ainsi que sur
        la création de questions. Quant à Richard, il s'est chargé de la création des formulaires de connexion et
        d'inscription, ainsi que de la mise à jour du projet Kickstarter.
        <br> <br>
        Semaine 3:<br>
        Le développement à continuer sans rencontrer de problèmes, la connexion et l'inscription ont été commencées,
        ces fonctionnalités seront finies d'ici fin Novembre.
      </p>
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
@import "@/assets/css/base.css"; 

.container {
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-color); 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.content {
  padding: 20px;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
  color: var(--text-color); 
}

.subtitle {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: var(--text-color); 
}

p {
  color: var(--gray-color); 
  line-height: 1.6;
  margin-bottom: 20px;
}

.content h2 {
  font-size: 28px;
  margin-top: 20px;
}

.content br {
  display: block;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%; /* Ajuste la largeur pour s'adapter à l'écran */
    padding: 10px;
  }

  .title {
    font-size: 24px; /* Réduit la taille des titres */
  }

  .content {
    padding: 10px; /* Réduit les marges internes */
  }

  .content p {
    font-size: 14px; /* Réduit la taille du texte */
    line-height: 1.4; /* Ajuste l'espacement entre les lignes */
  }

  .content h2 {
    font-size: 20px; /* Réduit la taille des sous-titres */
  }

  .subtitle {
    font-size: 18px; /* Réduit la taille des sous-titres */
  }
}
</style>
