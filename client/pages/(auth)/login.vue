<template>
  <div id="page_login">
    <div class="container">
      <h2>Connexion</h2>
          <form @submit.prevent="submitLogin">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="loginCred.email" required placeholder="Entrez votre email"/>
            </div>

            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input type="password" id="password" v-model="loginCred.password" required
                     placeholder="Entrez votre mot de passe"/>
            </div>

            <Button type="submit">Se connecter</Button>

            <router-link class="register" to="/register">Pas encore inscrit? </router-link>

            <p v-if="login.error" class="error-message">{{ login.error }}</p>

            <div class="social">
              <div class="social-login">
                <button class="social-btn discord" @click="loginWith('discord')">
                  <nuxt-img src="/img/discord.webp" alt="Discord"/>
                </button>
                <button class="social-btn google" @click="loginWith('google')">
                  <nuxt-img src="/img/google.png" alt="Google"/>
                </button>
              </div>
            </div>
          </form>
        </div>
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

/**
 * Login with a provider
 * @param {string} provider - The provider to login with
 */
let loginWith = (provider) => {
  switch (provider) {
    case 'discord':
      window.location.href = 'https://discord.com/oauth2/authorize?client_id=1309087675571245138&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=email+identify';
      break;
    case 'google':
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=1017411917158-mrmhfb3bpnmcdn35rkhfsknsd7osnsl7.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/google/callback&response_type=token&scope=openid%20profile%20email&prompt=consent';
      break;
    default:
      console.error('Erreur lors de la connexion');
  }
};
</script>

<style scoped>

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
