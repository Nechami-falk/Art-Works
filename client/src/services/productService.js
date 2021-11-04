import http from "./httpService";
import { apiUrl } from '../config.json';

export function getCategoryProduct (category){
    return http.get(`${apiUrl}/products/?category=${category}`);
    }

export function getSearchProduct(searchProduct){
    return http.get(`${apiUrl}/products/search?search=${searchProduct}`);
} 

/* export function getMyCart(){
    return http.get(`${apiUrl}/products/myCart`);
} */

export function onMySerch(value){
    return http.get(`${apiUrl}/products?=${value}`);
}  

export function getProducts (){
return http.get(`${apiUrl}/products`);
}
 

export function deleteProduct(productId){ 
    return http.delete(`${apiUrl}/products/${productId}`);
}


export function addProduct(product){
    return http.post(`${apiUrl}/products`, product);
}

export function getProduct(productId){
    return http.get(`${apiUrl}/products/${productId}`);
}


export function updateProduct(product, productId){ 
    return http.put(`${apiUrl}/products/${productId}`, product);
}

const service = {
    deleteProduct,
    addProduct,
    updateProduct,
    getProducts,
    getCategoryProduct,
    /* getMyCart, */
    getProduct,
    onMySerch,
    getSearchProduct
}

export default service;