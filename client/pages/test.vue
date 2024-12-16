<script setup>
const isAuth = await useAuthUser()
console.log(isAuth)
</script>

<template>
<div v-if="isAuth">
    {{ isAuth }}
</div>
</template>