
export const jhiAuthenticationToken = "jhi-authenticationToken";

export const getToken = () => {
  return sessionStorage.getItem(jhiAuthenticationToken)
}
export const setToken = (token: string) => {
  return sessionStorage.setItem(jhiAuthenticationToken, token)
}