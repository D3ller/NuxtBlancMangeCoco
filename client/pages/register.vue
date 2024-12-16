<script setup lang="ts">
definePageMeta({
  middleware: 'unknown-only'
})

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
  <h2>Inscription</h2>
  <div class="form">
    <div class="login-form">
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

        <button type="submit">S'inscrire</button>

        <p v-if="data.error" class="error-message">{{ data.error }}</p>

        <!-- Boutons sociaux pour l'inscription -->
        <div class="social">
          <div class="social-login">
            <button class="social-btn discord" @click="registerWith('discord')">
              <nuxt-img src="/img/discord.webp" alt="Discord" />
            </button>
            <button class="social-btn google" @click="registerWith('google')">
              <nuxt-img src="/img/google.png" alt="Google" />
            </button>
            <button class="social-btn webmail" @click="registerWith('webmail')">
              <nuxt-img src="/img/urca.png" alt="Webmail" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="inscrit">
    <router-link class="inscrit" to="/pages/login">Déjà inscrit ? Cliquez ici</router-link>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
}

h2 {
  color: black;
  text-align: center;
  margin: 70px;
  font-weight: 600;
  font-size: 36px;
}

.login-form {
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: gray;
  display: flex;
  justify-content: center;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #0040ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.inscrit {
  color: black;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 20px;
}

.inscrit a {
  color: black;
  text-decoration: none;
  font-size: 16px;
  transition: transform 0.3s ease;
}

.inscrit a:hover {
  transform: scale(1.1);
}

/* Media Queries pour la responsivité */
@media screen and (max-width: 768px) {
  .inscrit {
    margin: 5px 0;
  }
}

@media screen and (max-width: 480px) {
  .inscrit {
    margin: 5px 0;
  }
}

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
