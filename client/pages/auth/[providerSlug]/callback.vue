<script setup lang="ts">
const route = useRoute()
const router = useRouter()
let userInfo = ref<Object>('');

if(route.hash || route.query.code) {
  console.log(route.params.providerSlug === 'google' ? route.hash.split('&')[0].split('=')[1] : route.hash.split('&')[1])
  const {data: data, status, error, refresh} = await useFetch('/auth/callback', {
    method: 'POST',
    body: JSON.stringify({
      provider: route.params.providerSlug,
      code: route.params.providerSlug === 'google' ? route.hash.split('&')[0].split('=')[1] : route.hash.split('&')[1].split('=')[1]
    })
  });

  if(error.value) {
    router.push('/login')
  }

  if (data.value) {
    console.log(data.value);
    userInfo.value = data.value
  }
} else {
  router.push('/login')
}
</script>

<template>
{{route.query.code}}
  <div v-if="userInfo" style="color: white">
    {{userInfo.body.userInfo}}
  </div>
</template>

<style scoped>

</style>