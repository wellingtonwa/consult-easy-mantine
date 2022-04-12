import api from "../util/axios.util";

export const doLogin = (credentials: any) => {
    return api.post("/auth", credentials);
}
