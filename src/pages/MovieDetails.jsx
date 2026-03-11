import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import movies from "../data/movies";
import Cards from "../components/Cards";
import { useAuth } from "../context/AuthContext";

function MovieDetails() {

const { id } = useParams();
const location = useLocation();
const navigate = useNavigate();
const { user: authUser, token, isAuthenticated } = useAuth();

const movie = movies.find((m) => m.id === Number(id));

const [reviews, setReviews] = useState([]);
const [reviewText, setReviewText] = useState("");

/* FETCH REVIEWS FROM BACKEND */

useEffect(() => {

fetch("http://localhost:3000/reviews")
.then(res => res.json())
.then(data => {

const movieReviews = data.filter(
r => r.movieId === movie.id
);

setReviews(movieReviews);

});

}, [movie.id]);

/* SUBMIT REVIEW */

const submitReview = () => {

if (!isAuthenticated) {
navigate("/login", { state: { from: location } });
return;
}

fetch("http://localhost:3000/reviews",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({

movieId:movie.id,
user:authUser?.name || authUser?.email,
review:reviewText

})

})
.then(res=>res.json())
.then(()=>{

setReviewText("");

window.location.reload();

});

};

/* SUGGESTED MOVIES */

const relatedMovies = movies
.filter((m) => m.id !== movie.id)
.slice(0, 6);

return (

<div className="container mt-5 text-light">

{/* MOVIE DETAILS */}

<div className="row align-items-center">

<div className="col-md-4">

<img
src={movie.poster}
alt={movie.title}
style={{
width:"100%",
borderRadius:"15px"
}}
/>

</div>

<div className="col-md-8">

<h1 className="mb-3">{movie.title}</h1>

<p className="fs-5 text-warning">
⭐ {movie.rating}/5
</p>

<p style={{lineHeight:"1.8"}}>
{movie.description}
</p>

<p className="text-secondary">
<b>Release Date:</b> {movie.createdAt}
</p>

<a
href={movie.trailer}
target="_blank"
rel="noreferrer"
className="btn btn-danger mt-3"
>
▶ Watch Trailer
</a>

</div>

</div>

<hr className="my-5"/>

{/* REVIEWS */}

<h3 className="mb-3">Reviews</h3>

{reviews.length === 0 ? (
<p>No reviews yet</p>
) : (
reviews.map((r, index) => (

<p key={index}>
<b>{r.user}:</b> {r.review}
</p>

))
)}

{/* REVIEW FORM */}

<h4 className="mt-4">Add Review</h4>

<textarea
placeholder="Write review..."
className="form-control mb-2"
value={reviewText}
onChange={(e)=>setReviewText(e.target.value)}
/>

<button
className="btn btn-primary"
onClick={submitReview}
>
{isAuthenticated ? "Submit Review" : "Login to Review"}
</button>

<hr className="my-5"/>

{/* RECOMMENDED MOVIES */}

<h3 className="text-light mb-4">
You Can Also See
</h3>

<div className="movie-scroll">

{relatedMovies.map((m)=>(
<div className="movie-item" key={m.id}>

<Cards
id={m.id}
title={m.title}
description={m.description}
rating={m.rating}
poster={m.poster}
createdAt={m.createdAt}
/>

</div>
))}

</div>

</div>

);

}

export default MovieDetails;