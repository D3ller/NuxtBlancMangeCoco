<script setup lang="ts">

</script>

<template>
  <h2>Inscription</h2>
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
          <label for="Pseudo">Pseudo</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Entrez votre pseudo"
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
      </form>
    </div>
  </div>
  <div class="inscrit">
    <router-link class="inscrit" to="login">Déja inscrit cliquer ici</router-link>
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
      // Vérification simple (ajoutez ici votre logique de validation plus avancée si nécessaire)
      if (this.email === '' || this.password === '') {
        this.error = "Veuillez remplir tous les champs.";
      } else {
        this.error = '';
        // Appel API pour la connexion ou autre logique
        console.log("Email:", this.email, "Password:", this.password);
        // Rediriger ou traiter le succès ici
      }
    }
  }
};
</script>
<style scoped>
.form{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;

}
h2{
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
  text-align: center    ;
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
  background-color: #0040FF;
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

.inscrit{
  color: black;
  display: flex;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 10px;
}
.inscrit a {
  color: black;
  text-decoration: none;
  font-size: 16px;
  transition: transform 0.3s ease; /* Animation pour le zoom */
}
.inscrit a:hover {
  transform: scale(1.1); /* Agrandissement à 110% lors du survol */
}
</style>