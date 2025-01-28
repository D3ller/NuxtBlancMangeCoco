<script lang="ts" setup>
let data = reactive({
  email: '',
  pseudo: '',
  password: '',
  error: ''
})

function submitRegister() {
  if (data.email === '' || data.password === '' || data.pseudo === '') {
    data.error = "Veuillez remplir tous les champs.";
  } else {
    data.error = '';
    console.log("Email:", data.email, "Pseudo:", data.pseudo, "Password:", data.password);
  }
}

</script>

<template>
  <div id="page_login">
    <div class="container"><h2>Inscription</h2>
      <form @submit.prevent="submitRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              id="email"
              v-model="data.email"
              placeholder="Entrez votre email"
              required
              type="email"
          />
        </div>

        <div class="form-group">
          <label for="pseudo">Pseudo</label>
          <input
              id="pseudo"
              v-model="data.pseudo"
              placeholder="Entrez votre pseudo"
              required
              type="text"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
              id="password"
              v-model="data.password"
              placeholder="Entrez votre mot de passe"
              required
              type="password"
          />
        </div>

        <Button type="submit">S'inscrire</Button>

        <NuxtLink class="register" to="/login">Déjà inscrit ? Cliquez ici</NuxtLink>


        <p v-if="data.error" class="error-message">{{ data.error }}</p>

        <!-- Boutons sociaux pour l'inscription -->
        <div class="social">
          <div class="social-login">
            <button class="social-btn discord" @click="loginWith('discord')">
              <nuxt-img alt="Discord" src="/img/discord.webp"/>
              Se connecter avec Discord
            </button>
            <button class="social-btn google" @click="loginWith('google')">
              <nuxt-img alt="Google" src="/img/google.png"/>
              Se connecter avec Google
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
