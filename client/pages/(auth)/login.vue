<template>
  <h2>Connexion</h2>
  <div class="form">
    <div class="login-form">
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="loginCred.email" required placeholder="Entrez votre email" />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="loginCred.password" required
            placeholder="Entrez votre mot de passe" />
        </div>

        <button type="submit">Se connecter</button>

        <p v-if="login.error" class="error-message">{{ login.error }}</p>

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

<script setup>
const router = useRouter()

const { login } = useAuth()

let loginCred = reactive({
  email: '',
  password: '',
  error: ''
})

let submitLogin = async () => {
  if (loginCred.email === '' || loginCred.password === '') {
    loginCred.error = "Veuillez remplir tous les champs.";
  }

  await login(loginCred.email, loginCred.password, 'default')

};

let loginWith = (provider) => {
  switch (provider) {
    case 'discord':
      window.location.href = 'https://discord.com/oauth2/authorize?client_id=1309087675571245138&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=email+identify';
      break;
    case 'google':
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=1017411917158-mrmhfb3bpnmcdn35rkhfsknsd7osnsl7.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google/callback&response_type=token&scope=openid%20profile%20email&prompt=consent';
      break;
    case 'webmail':
      console.log('Connexion avec Webmail');
      break;
    default:
      console.error('Erreur lors de la connexion');
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
    margin: 5px 0;
    /* Ajuster la marge pour les petits écrans */
  }
}

/* Styles responsifs pour des écrans encore plus petits (mobiles) */
@media screen and (max-width: 480px) {
  .inscrit {
    margin: 5px 0;
    /* Ajuster encore la marge pour les très petits écrans */
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
  width: 34px;
  /* Taille de l'image */
  height: 24px;
  display: block;
  /* Pour centrer l'image */
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
