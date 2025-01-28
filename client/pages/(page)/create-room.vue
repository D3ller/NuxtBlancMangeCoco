<script setup>
const router = useRouter();

onMounted(() => {
    // let randomName = Math.random().toString(36).substring(2, 8);
    let randomName = 'IUT2TROYES'

    socket.emit('create-server', randomName, (cb) => {
        console.log(cb)
    })

    // router.push(`/tv?id=${randomName}`)
    router.push(`/tv?id=IUT2TROYES`)
    
})
</script>

<template>
    création de la room en cours
</template>