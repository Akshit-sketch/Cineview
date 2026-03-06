import Carousel from "react-bootstrap/Carousel";

function HeroCarousel() {

const movies = [

{
title:"Interstellar",
description:"A team travels through a wormhole in space to save humanity.",
image:"https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
},

{
title:"The Dark Knight",
description:"Batman faces the Joker in Gotham City.",
image:"https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg"
},

{
title:"Avatar",
description:"A marine explores the alien world of Pandora.",
image:"https://image.tmdb.org/t/p/original/jlNUjHrTnFqgPj5K8pQ9Gv2rV0A.jpg"
},

{
title:"Dune",
description:"A noble family fights for control of the desert planet Arrakis.",
image:"https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg"
},

{
title:"Oppenheimer",
description:"The story of the father of the atomic bomb.",
image:"https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg"
}

];

return (

<Carousel fade>

{movies.map((movie,index)=>(
<Carousel.Item key={index}>

<img
className="d-block w-100 hero-img"
src={movie.image}
alt={movie.title}
/>

<Carousel.Caption className="hero-caption">

<h2>{movie.title}</h2>

<p>{movie.description}</p>

<div className="hero-buttons">

<button className="btn btn-light me-2">
Watch Now
</button>

<button className="btn btn-primary">
<i className="bi bi-heart-fill"></i>
</button>

</div>

</Carousel.Caption>

</Carousel.Item>
))}

</Carousel>

);

}

export default HeroCarousel;