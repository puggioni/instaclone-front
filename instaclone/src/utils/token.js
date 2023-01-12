import {TOKEN} from "./constants";

export function setToken(token){
    localStorage.setItem(TOKEN, token);
}

export function getToken(){
    return localStorage.getItem(TOKEN);
}

export function decodeToken(token){
    const payload = token.split(".")[1];
    return atob(payload);
}