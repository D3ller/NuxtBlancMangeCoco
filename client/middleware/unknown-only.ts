export default defineNuxtRouteMiddleware((to, from) => {
    const user = useAuthUser();

    if(user.value) {
        if(import.meta.server) {
            return navigateTo({name: 'profile'});
        }
    }

    return abortNavigation();
})
