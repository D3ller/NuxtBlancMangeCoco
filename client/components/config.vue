<script lang="ts" setup>
import Button  from '@/components/global/button.vue';
const isSubmit = ref(false)
const username = ref('')

// watch(isSubmit, () => {
//     document.body.style.overflow = 'hidden'
// })

onMounted(() => {
    document.body.style.overflow = 'hidden'
})

function setUsername() {
    document.body.style.overflow = '' 
    console.log(username.value)
    isSubmit.value = true
}

</script>

<template>
    <div class="config_wrapper" v-if="!isSubmit">
        <form @submit.prevent="setUsername()">
            <label for="username">
                <h5>Username</h5>
                <input type="text" name="username" v-model="username">
            </label>
            <Button style="width: 30%">Submit</Button>
        </form>
    </div>
</template>

<style scoped>
.config_wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.9);
}

.config_wrapper form {
    background: white;
    border-radius: 10px;
    width: 40%;
    height: 30%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.config_wrapper form label h5 {
    margin-bottom: 10px;
}

.config_wrapper form label {
    margin-bottom: 20px;
    width: 40%;
}

.config_wrapper form label input {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
}
</style>