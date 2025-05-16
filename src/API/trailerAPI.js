import axios from "axios"

// const localURL = "http://localhost:3005"

// const getAllTrailers=()=>axios.get(`${baseURL}`)
// const getAllTrailerById=(id)=>axios.get(`${localURL}/${id}`)



const baseURL = `https://gendy.sersawy.com/imdb/api.php?type=trailer&action=all`
const getAllTrailers=()=>axios.get(`${baseURL}`)
const getAllTrailerById=(id)=>axios.get(`https://gendy.sersawy.com/imdb/api.php?type=trailer&action=movie&id=${id}`)

export {getAllTrailers,getAllTrailerById}

