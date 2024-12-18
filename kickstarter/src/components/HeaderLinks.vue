<template>
  <div class="app-container">
    <header class="header">
      <nav>
        <ul>
          <li :class="{ active: isActive('/') }">
            <router-link to="/" @click="setActiveSection('campagne')">Campagne</router-link>
          </li>
          <li :class="{ active: isActive('/actus') }">
            <router-link to="/actus" @click="setActiveSection('actu')">Actus</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from 'vue-router';

let activeSection = ref("campagne");
const route = useRoute();

let setActiveSection = (section) => {
  activeSection.value = section;
};

let isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.header {
  width: 100%;
}

nav {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  width: 70%;
}

li {
  margin: 0 10px;
}

li a {
  color: var(--text-color);
  font-weight: 500;
  text-decoration: none;
  padding: 10px;
  position: relative;
  transition: color 0.3s ease;
  font-size: 20px;
}

li.active a {
  color: white; /* Change the text color to white when active */
}

li a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: var(--theme-color);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

li.active a::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>