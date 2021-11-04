import http from './httpService';
import { apiUrl} from "../config.json"
import jwtDecode from 'jwt-decode';

const tokenKey = "token";
const tokenAdmin = "tokenAdmin";

//מחזיר לנו טוקן כשנרצה לוודא אם יש טוקן
export function getJwt(){
    return localStorage.getItem(tokenKey);
}


export function logout(){
    localStorage.removeItem(tokenKey);
}
//פותח את הטוקן כדי לקבל נתונים על היוזר
export function getCurrentUser(){
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }
    catch(ex){
        return null
    }
}

export function getCurrentAdmin(){
    try{
        const jwt = localStorage.getItem(tokenAdmin);
        return jwtDecode(jwt);
    }
    catch(ex){
        return null
    }
}

export async function lgout(){
    localStorage.removeItem(tokenKey);
}


export async function loginAdmin (email, password) {
    const {data} = await http.post (`${apiUrl}/auth/admin`, {email, password});
    localStorage.setItem(tokenAdmin, data.tokenAdmin);
   
}

export function getUser (userId) {
    return http.get (`${apiUrl}/users/search?search=${userId}`);
}

export async function login (email, password) {
    const {data} = await http.post (`${apiUrl}/auth`, {email, password});
    localStorage.setItem(tokenKey, data.token);
   
}

const user = {
    login,
    getCurrentUser,
    lgout,
    getJwt,
    loginAdmin,
    getCurrentAdmin,
    getUser
};

export default user;