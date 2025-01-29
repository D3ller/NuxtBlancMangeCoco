import {useAuthUser} from "~/composables/useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const setCookie = (cookie: any) => {
    cookie.value = cookie;
  };

  const login = async (username :string, password :string, loginMethod :string) => {
    const data = await $fetch('/auth/login', {
      method: 'POST',
      body: {
        email: username,
        password: password,
        rememberMe: true,
        loginMethod
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

        console.log(data)

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
