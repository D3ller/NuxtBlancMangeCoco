<template>
  <h2>Connexion</h2>
  <div class="form">
    <div class="login-form">
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Entrez votre email"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Entrez votre mot de passe"
          />
        </div>

        <button type="submit">Se connecter</button>

        <p v-if="error" class="error-message">{{ error }}</p>

        <!-- Boutons sociaux -->
        <div class="social">
          <div class="social-login">
            <button class="social-btn discord" @click="loginWith('discord')">
              <nuxt-img src="/img/discord.webp" alt="Discord" />
            </button>
            <button class="social-btn google" @click="loginWith('google')">
              <nuxt-img src="/img/google.png" alt="Google" />
            </button>
            <button class="social-btn webmail" @click="loginWith('webmail')">
              <nuxt-img src="/img/urca.png" alt="Webmail" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="inscrit">
    <router-link class="inscrit" to="register">Pas encore inscrit ici</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    submitLogin() {
      if (this.email === '' || this.password === '') {
        this.error = "Veuillez remplir tous les champs.";
      } else {
        this.error = '';
        console.log("Email:", this.email, "Password:", this.password);
      }
    },
    loginWith(provider) {
      console.log("Login avec", provider);
      // Ajoutez ici la logique de connexion via les services sociaux.
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
}

h2 {
  color: white;
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
  color: white;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 5px;
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

@media screen and (max-width: 768px) {
  .inscrit {
    margin: 5px 0; /* Ajuster la marge pour les petits écrans */
  }
}

/* Styles responsifs pour des écrans encore plus petits (mobiles) */
@media screen and (max-width: 480px) {
  .inscrit {
    margin: 5px 0; /* Ajuster encore la marge pour les très petits écrans */
  }
}

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
  display: block; /* Pour centrer l'image */
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
