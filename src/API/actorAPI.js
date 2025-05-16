import axios from "axios"

const localURL = `http://localhost:3005`

// const getPopularActors=()=>axios.get(`${localURL}`)
// const getPopularActorById=(id)=>axios.get(`${localURL}/${id}`)


const baseURL = `https://gendy.sersawy.com/imdb/api.php?type=actor&action=all`
const getPopularActors=()=>axios.get(`${baseURL}`)
const getPopularActorById=(id)=>axios.get(`https://gendy.sersawy.com/imdb/api.php?type=actor&action=actor&id=${id}`)

export {getPopularActors,getPopularActorById}

