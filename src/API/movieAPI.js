import axios from "axios"

// const localURL = "http://localhost:3005"

// const getAllMovies=()=>axios.get(`${localURL}`)
// const getMovieById=(id)=>axios.get(`${localURL}/${id}`)

// const addReviewToMovie = (id, review) => {
//   return axios.get(`${localURL}${id}`).then((res) => {
//     const movie = res.data;
//     const updatedReviews = [review, ...(movie.reviews || [])];
//     return axios.put(`${localURL}/${id}`, {
//       ...movie,
//       reviews: updatedReviews,
//     });
//   });
// };

// const updateReviewReaction = async (movieId, reviewIndex, type) => {
//   const { data } = await getMovieById(movieId);
//   const reviews = data.reviews || [];
//   if (!reviews[reviewIndex]) throw new Error("Review not found");
//   const review = reviews[reviewIndex];
//   review.likes = review.likes || 0;
//   review.dislikes = review.dislikes || 0;
//   if (type === "like") {
//     review.likes += 1;
//   } else if (type === "dislike") {
//     review.dislikes += 1;
//   }
//   return await axios.put(`${localURL}/${movieId}`, {
//     ...data,
//     reviews,
//   });
// };



const getAllMovies=()=>axios.get(`https://gendy.sersawy.com/imdb/api.php?action=all`)
const getMovieById=(id)=>axios.get(`https://gendy.sersawy.com/imdb/api.php?action=movie&id=${id}`)

const addReviewToMovie = (id, review) => {
  return axios.get(`https://gendy.sersawy.com/imdb/api.php?action=movie&id=${id}`).then((res) => {
    const movie = res.data;
    const updatedReviews = [review, ...(movie.reviews || [])];
    return axios.put(`https://gendy.sersawy.com/imdb/api.php?action=edit&id=${id}`, {
      ...movie,
      reviews: updatedReviews,
    });
  });
};

const updateReviewReaction = async (movieId, reviewIndex, type) => {
  const { data } = await getMovieById(movieId);
  const reviews = data.reviews || [];
  if (!reviews[reviewIndex]) throw new Error("Review not found");
  const review = reviews[reviewIndex];
  review.likes = review.likes || 0;
  review.dislikes = review.dislikes || 0;
  if (type === "like") {
    review.likes += 1;
  } else if (type === "dislike") {
    review.dislikes += 1;
  }
  return await axios.put(`https://gendy.sersawy.com/imdb/api.php?action=movie&id=${movieId}`, {
    ...data,
    reviews,
  });
};

export {updateReviewReaction,addReviewToMovie,getAllMovies,getMovieById}