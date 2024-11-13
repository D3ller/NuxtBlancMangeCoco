<template>
  <div class="app-container">
    <header class="header">
      <nav>
        <ul>
          <li :class="{ active: activeSection === 'campagne' }">
            <a href="#campagne" @click="setActiveSection('campagne')"
              >Campagne</a
            >
          </li>
          <li :class="{ active: activeSection === 'actu' }">
            <a href="#actu" @click="setActiveSection('actu')">Actus</a>
          </li>
        </ul>
      </nav>
    </header>

    <!-- <main class="content">
      <section id="campagne" v-if="activeSection === 'campagne'">
        
      
      </section>
      <section id="actu" v-if="activeSection === 'actu'">
        
      </section>
    </main> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
let activeSection = ref("campagne");

let setActiveSection = (section) => {
  activeSection.value = section;
};
</script>

<style scoped>
.header {
  width: 100%;
}

nav {
  margin-top: 20px;
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
