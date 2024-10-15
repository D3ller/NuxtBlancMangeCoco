import {useAuthUser} from "~/composables/useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const setCookie = (cookie: any) => {
    cookie.value = cookie;
  };

  const login = async (username, password) => {
    const data = $fetch('/auth/login', {
      method: 'POST',
      body: {
        email: username,
        password: password
      }
    })

    setUser(data.user)

    return data;
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        const data = await $fetch("/auth/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });

        setUser(data.user);
      } catch (error) {
        setCookie(null);
      }
    }

    return authUser;
  };

  return {
    login,
    me,
  }
}
