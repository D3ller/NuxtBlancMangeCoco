<script setup lang="ts">

import Avance from "@/components/avance.vue";
import Changelog from "@/components/changelog.vue";
import Team from "@/components/Team.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="container">

    <Header></Header>

    <avance></avance>

    <team></team>

    <changelog>
      <h2 class="title" id="description">Description du projet</h2>
      <p>Banana Split révolutionne les soirées jeux entre amis avec une expérience moderne et interactive. Ce jeu
        d'ambiance, à l'humour décalé et sans limites, vous garantit des moments hilarants, tout en intégrant la
        technologie pour rendre le tout encore plus amusant et accessible. Si vous aimez les jeux où l'absurde et
        l'humour noir prennent le dessus, vous allez adorer cette version connectée !
        Banana Split révolutionne les soirées jeux entre amis avec une expérience moderne et interactive. Ce jeu d'ambiance, à l'humour décalé et sans limites, vous garantit des moments hilarants, tout en intégrant la technologie pour rendre le tout encore plus amusant et accessible. Si vous aimez les jeux où l'absurde et l'humour noir prennent le dessus, vous allez adorer cette version connectée !
      </p>
        <h3 class="subtitle">But du jeu</h3>
        Le concept est simple : à chaque tour, un joueur tire une carte Scénario, présentée sur l'écran de télévision, avec une phrase incomplète ou une situation absurde. Les autres joueurs, à l’aide de leurs téléphones, choisissent une carte Réponse parmi celles affichées sur leur écran pour compléter la phrase de la manière la plus drôle, choquante ou absurde. Le joueur qui a tiré la carte juge alors la meilleure proposition, et celui qui l’a soumise gagne un point.

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

        Convivialité connectée : grâce à l'intégration des téléphones, tout est plus fluide et instantané. Plus besoin de distribuer des cartes ou de ranger quoi que ce soit : tout se fait de manière digitale.
        Des situations hilarantes : à chaque tour, les combinaisons de phrases et de réponses créent des moments d'humour totalement imprévisibles.
        Idéal pour les soirées : Banana Split est parfait pour animer des soirées entre amis ou en famille. Facile à comprendre et à jouer, il suffit d’une télévision et de téléphones pour passer des heures de fous rires.
        Humour sans limites : que vous soyez fan de blagues absurdes, de jeux de mots ou d’humour noir, Banana Split vous offre une grande variété de scénarios et de réponses pour satisfaire tous les goûts.
        Ce jeu est conçu pour apporter une touche de modernité à vos soirées tout en vous offrant des moments de détente et de rire. Avec Banana Split, préparez-vous à vivre une expérience aussi interactive qu’inoubliable !

      <h2 class="title" id="note">Note de cadrage</h2>

      <h2 class="title" id="planning">Planning</h2>

      <h2 class="title" id="etat">Etat de l'art du domaine</h2>

      <h2 class="title" id="avance">Avancée du projet</h2>
    </changelog>
  </div>
</template>
