import axios from 'axios'

const api = "http://localhost:8080/products"


export const fetchProducts = async ()=>{
    try {
        const res = await axios.get(api);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}