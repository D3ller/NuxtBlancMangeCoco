<script setup>
import Avance from "@/components/avance.vue";
import Changelog from "@/components/changelog.vue";
import Team from "@/components/Team.vue";
import Header from "@/components/Header.vue";
import HeaderLinks from "@/components/HeaderLinks.vue";
</script>

<template>
  <div class="container">
    <Header></Header>
    <avance></avance>
    <team></team>
    <HeaderLinks></HeaderLinks>
    <changelog>
      <h2 class="title" id="description">Description du projet</h2>
      <p>Banana Split révolutionne les soirées jeux entre amis avec une expérience moderne et interactive. Ce jeu
        d'ambiance, à l'humour décalé et sans limites, vous garantit des moments hilarants, tout en intégrant la
        technologie pour rendre le tout encore plus amusant et accessible. Si vous aimez les jeux où l'absurde et
        l'humour noir prennent le dessus, vous allez adorer cette version connectée !
        Banana Split révolutionne les soirées jeux entre amis avec une expérience moderne et interactive. Ce jeu d'ambiance, à l'humour décalé et sans limites, vous garantit des moments hilarants, tout en intégrant la technologie pour rendre le tout encore plus amusant et accessible. Si vous aimez les jeux où l'absurde et l'humour noir prennent le dessus, vous allez adorer cette version connectée !
      </p>
      <h3 class="subtitle">But du jeu</h3>
      <p>Le concept est simple : à chaque tour, un joueur tire une carte Scénario, présentée sur l'écran de télévision, avec une phrase incomplète ou une situation absurde. Les autres joueurs, à l’aide de leurs téléphones, choisissent une carte Réponse parmi celles affichées sur leur écran pour compléter la phrase de la manière la plus drôle, choquante ou absurde. Le joueur qui a tiré la carte juge alors la meilleure proposition, et celui qui l’a soumise gagne un point.</p>
      <h3 class="subtitle" id="note">Comment jouer ?</h3>
      <p>
        Tous les joueurs se connectent à la partie via leur téléphone en scannant un QR code ou en entrant un code sur une plateforme dédiée.
        La télévision sert de tableau principal, où les cartes Scénario et les résultats des tours sont affichés.
        À chaque tour, un joueur est désigné comme le juge et tire une carte Scénario, qui apparaît sur la TV.
        Chaque joueur reçoit une main de cartes Réponse sur son téléphone. Ils choisissent celle qu’ils estiment la plus drôle ou décalée pour compléter la situation.
        Le juge lit ensuite toutes les propositions (de manière anonyme) sur la télévision et choisit la meilleure. Le gagnant de la manche reçoit un point.
        Le rôle du juge passe d’un joueur à l’autre, et la partie continue jusqu’à ce qu’un joueur ait accumulé un nombre de points fixé à l’avance, ou jusqu’à ce que vous décidiez de vous arrêter après une série de fous rires !
        Ambiance et technologie pour plus de fun !
        En mêlant l'humour absurde à une utilisation innovante des téléphones et de la télévision, Banana Split modernise le jeu d'ambiance. Les joueurs peuvent se concentrer sur l'aspect ludique sans avoir à gérer de cartes physiques, tout en profitant d'une dynamique fluide et immersive. Les cartes défilent sur l'écran, et les joueurs interagissent facilement via leur smartphone, rendant le jeu accessible et rapide à prendre en main.
      </p>
      <h3 class="subtitle" id="note">Pourquoi jouer à Banana Split ?</h3>
      <p>
        Convivialité connectée : grâce à l'intégration des téléphones, tout est plus fluide et instantané. Plus besoin de distribuer des cartes ou de ranger quoi que ce soit : tout se fait de manière digitale.
        Des situations hilarantes : à chaque tour, les combinaisons de phrases et de réponses créent des moments d'humour totalement imprévisibles.
        Idéal pour les soirées : Banana Split est parfait pour animer des soirées entre amis ou en famille. Facile à comprendre et à jouer, il suffit d’une télévision et de téléphones pour passer des heures de fous rires.
        Humour sans limites : que vous soyez fan de blagues absurdes, de jeux de mots ou d’humour noir, Banana Split vous offre une grande variété de scénarios et de réponses pour satisfaire tous les goûts.
        Ce jeu est conçu pour apporter une touche de modernité à vos soirées tout en vous offrant des moments de détente et de rire. Avec Banana Split, préparez-vous à vivre une expérience aussi interactive qu’inoubliable !
      </p>
      <h2 class="title" id="note">Note de cadrage</h2>
      <p>
        Définition du projet: <br>
        Ce projet à pour but de réaliser un jeu de cartes avec le même principe que les jeux de société à l’humour décalé.
        Origine du projet / Contexte
        Une entreprise spécialisée dans les jeux de société souhaite étendre son offre en développant une version numérique de l'un de ses jeux populaires.
        <br>
        <br>
        Objectifs du projet:<br>
        -Occuper les étudiants n’ayant pas cours<br>
        -Les utilisateurs doivent pouvoir créer un compte via Google/Discord et / ou leur adresse mail<br>
        -Les utilisateurs peuvent supprimer leurs compte si nécessaires<br>
        -Les utilisateurs doivent pouvoir créer des salles ou rejoindre des salons de jeu<br>
        -Les utilisateurs doivent pouvoir créer des cartes personnalisées<br>
        -Voter pour le thème des cartes (objectif bonus)
        <br> <br>
        Livrables:<br>
        -Maquette<br>
        - Charte Graphique<br>
        -Site fonctionnel<br>
        -Page « kickstarter »
        <br> <br>
        Périmètre du projet:
        Le projet sera un site web accessible via un QR code présent sur les télévisions, il faudra être au minimum 3 joueurs pour pouvoir lancer une partie et au maximum être 8 pour jouer.
        <br><br>
        Contraintes:<br>
        -Jeu multi-joueurs
        <br> <br>
        Acteurs:
        Richard Quin
        Corentin Nelhomme
        Émilien Rozier
        Axel Tribondeau
        <br> <br>
        Macro-Planning:<br>
        -	Début du projet : 11 Septembre 2024<br>
        -	Fin du projet : à déterminé<br>
        <br>
        -	Étapes clés :
        o	Définition des besoins fonctionnels
        o	Création du site présentant le jeu
        o	Architecture du développement back (CRUD/BDD)
        o	Charte graphique
        o	Maquettes desktops & mobile
        <br> <br>
        Ressources:<br>
        •	Nuxt<br>
        •	Socket.io<br>
        •	Prisma<br>
        •	NoSQL
        <br><br>
        Communication
        Nous ferons un rapport sur l’avancement du projet une fois par semaine ou une fois toutes les deux semaines au commanditaire.
        Risques
        Les risques possibles sont le manque de temps pour finaliser ( si trop d’ambition) et les difficultés techniques (Nuxt, Prisma).
      </p>
      <h2 class="title" id="planning">Planning</h2>
      <h3>Conception  (Septembre):</h3> 
      <p>Phase dans laquelle nous avons trouvé l'idée du jeu, définis les règles de jeu et le design de ce dernier et que nous avons définis les tâches et rôles de chacun.</p>
      <h3>Landing Page (Septembre-Octobre)</h3>
      <p>Design et prototypage de la landing page qui va être utiliser pour lancer le jeu depuis une télévision et un QR code.</p>
      <h3>Développement du jeu  (Octobre-à déterminé)</h3>
      <p>Création du jeu en lui-même, avec les différentes fonctionnalités que nous avons définis dans la note de cadrage.</p>
      <h3>Tests et corrections (à déterminé)</h3>
      <h3>Déploiement du jeu (à déterminé)</h3>
      <h2 class="title" id="etat">Etat de l'art du domaine</h2>
      <p>
        Pour le moment, nous savons que pour ce type nous avons besoin de deux types de cartes, les « cartes phrases à trous » et les cartes « bout de phrases », ces dernières permettent de compléter les cartes phrases à trous.
        Les règles de ce genre de jeux sont simples à comprendre, chaque joueur reçoit un certain nombre de cartes (11 pour blanc manger coco, 10 pour son homonyme anglais « Cards Against Humanity » ). Dans chacun de ces jeux, un Game Master ou Question Master est désigné au hasard pour le premier tour, ce dernier lira une carte « phrase à compléter » au hasard dans la pile de cartes de phrases à compléter et tout les joueurs sauf le Question Master devront choisir une de leur carte pour compléter la phrase lue par le Question Master. Lorsque tous les joueurs ont choisi leurs cartes, le Question Master doit alors relire la phrase à compléter avec chaque réponse des joueurs. Suite à ça le Question Master choisit alors la carte qui l’a fait le plus rire et si c’est la vôtre vous devenez alors Question pour le deuxième tour de jeu, avant chaque nouvelle carte « phrase à compléter » tous les joueurs doivent piocher une carte « but de phrases pour rester constamment à 11 ou 10 cartes.
        Le premier joueur à 5 points gagne la partie. (il est possible d’augmenter le nombre de points à avoir pour gagner la partie.)
        Pour Banana Split, nous allons partir sur des règles similaires à Blanc Manger Coco, un Question Master est choisi de façon aléatoire et il pourra donner son rôle lorsqu’il aura voté pour sa carte préférée.
      </p>
      <h2 class="title" id="avance">Avancée du projet</h2>
      <p>Semaine 1: <br>
        Nous avons donc décidé de commencer par définir le design de notre site, notamment le logo et les différentes couleurs que nous allions utiliser. Ensuite, nous avons commencé à créer une maquette des différentes pages que nous avions imaginées, telles que la page d'accueil, la barre de navigation, le pied de page, ainsi que la version mobile. Pendant ce temps, Corentin et Emilien ont commencé à faire des tests avec Socket.io et à explorer comment adapter notre jeu pour les téléphones. Nous avons aussi commencer à organiser comment allions mettre nos données.
        <br> <br>
        Semaine 2:<br>
        Cette semaine, nous avons réparti les tâches comme suit : Corentin s'est occupé de la création et de la configuration de différentes  pages, tandis qu'Émilien a pris en charge la configuration de Socket.io et des requêtes associées. Axel a travaillé sur l'alimentation de notre base de données à l'aide du jeu, ainsi que sur la création de questions. Quant à Richard, il s'est chargé de la création des formulaires de connexion et d'inscription, ainsi que de la mise à jour du projet Kickstarter.
        <br> <br>
        Semaine 3:<br>
        Le développement à continuer sans rencontrer de problèmes, la connexion et l'inscription ont été commencées, ces fonctionnalités seront finies d'ici fin Novembre.
      </p>
    </changelog>
  </div>
</template>

<style scoped>
/* Styles de base */
.container {
  padding: 20px;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 24px;
  margin: 10px 0;
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

@media (max-width: 480px) {
  .title {
    font-size: 12px;
  }

  .subtitle {
    font-size: 16px;
  }

  p,
  ul {
    font-size: 14px;
    line-height: 1.3;
  }

  .container {
    padding: 8px;
  }
}
</style>