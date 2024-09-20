import {useAuthUser} from "~/composables/useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
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

  return {
    login
  }
}
