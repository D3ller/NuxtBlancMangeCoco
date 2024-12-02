<script setup lang="ts">

const route = useRoute()
const router = useRouter()

let userInfo = ref<Object>('');

async function handleAuthentication() {
  let body = JSON.stringify({
    provider: route.params.providerSlug,
    code: route.params.providerSlug === 'google' ? route.hash.split('&')[0].split('=')[1] : route.hash.split('&')[1].split('=')[1]
  })

  try {
    await $fetch('/auth/callback', {
      method: 'POST',
      credentials: 'include',
      body: body
    }).then((res) => {
      return res.body.userInfo
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  handleAuthentication()
})

if (route.hash || route.query.code) {


  // const { data, status, error, refresh } = await useFetch('/auth/callback', {
  //   method: 'POST',
  //   credentials: 'include',
  //   body
  // });

  // if(error.value) {
  //   router.push('/login')
  // }

  // if (data.value) {
  //   console.log(data.value);
  //   userInfo.value = data.value
  // }
} else {
  router.push('/login')
}
</script>

<template>
  <!-- {{route.query.code}}
  <div v-if="userInfo" style="color: white">
    {{userInfo.body.userInfo}}
  </div> -->

  <div v-if="userInfo">
    {{ userInfo }}
  </div>
</template>

<style scoped></style>