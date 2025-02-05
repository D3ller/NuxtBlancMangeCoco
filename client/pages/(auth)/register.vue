<script setup lang="ts">
let data = reactive({
  email: '',
  pseudo: '',
  password: '',
  error: ''
})

function submitRegister() {
  if (data.email === '' || data.password === '' || data.pseudo === '') {
    this.error = "Veuillez remplir tous les champs.";
  } else {
    this.error = '';
    console.log("Email:", data.email, "Pseudo:", data.pseudo, "Password:", data.password);
  }
}

function registerWith(provider) {
  console.log("Inscription via", provider);
}


</script>

<template>
  <div id="page_login">
    <div class="container"><h2>Inscription</h2>
      <form @submit.prevent="submitRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              type="email"
              id="email"
              v-model="data.email"
              required
              placeholder="Entrez votre email"
          />
        </div>

        <div class="form-group">
          <label for="pseudo">Pseudo</label>
          <input
              type="text"
              id="pseudo"
              v-model="data.pseudo"
              required
              placeholder="Entrez votre pseudo"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
              type="password"
              id="password"
              v-model="data.password"
              required
              placeholder="Entrez votre mot de passe"
          />
        </div>

        <Button type="submit">S'inscrire</Button>

        <NuxtLink class="register" to="/login">Déjà inscrit ? Cliquez ici</NuxtLink>


        <p v-if="data.error" class="error-message">{{ data.error }}</p>

        <!-- Boutons sociaux pour l'inscription -->
        <div class="social">
          <div class="social-login">
            <button class="social-btn discord" @click="registerWith('discord')">
              <nuxt-img src="/img/discord.webp" alt="Discord"/>
            </button>
            <button class="social-btn google" @click="registerWith('google')">
              <nuxt-img src="/img/google.png" alt="Google"/>
            </button>
            <button class="social-btn webmail" @click="registerWith('webmail')">
              <nuxt-img src="/img/urca.png" alt="Webmail"/>
            </button>
          </div>
        </div>
      </form>
  </div>
  </div>
</template>

<style scoped>
/* Boutons sociaux */
.social {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.social-login {
  display: flex;
  justify-content: space-around;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin: 5px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
}

.social-btn img {
  width: 34px; /* Taille de l'image */
  height: 24px;
  display: block;
  object-fit: contain;
}

.discord {
  background-color: #5F6FBE;
}

.google {
  background-color: #ffffff;
}

.webmail {
  background-color: white;
}

.social-btn:hover {
  transform: scale(1.1);
}
</style>
