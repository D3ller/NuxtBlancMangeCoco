import type {accountwopassword} from "~/type";

export const useAuthUser = () => {
  return useState<accountwopassword | null>('user', () => null)
}