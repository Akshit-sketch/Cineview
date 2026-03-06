import React from "react";

const people = [
{
name:"Sydney Sweeney",
image:"https://upload.wikimedia.org/wikipedia/commons/2/21/Sydney_Sweeney_2019.jpg"
},
{
name:"Jason Statham",
image:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Jason_Statham_2018.jpg"
},
{
name:"Jim Carrey",
image:"https://upload.wikimedia.org/wikipedia/commons/f/f1/Jim_Carrey_2012.jpg"
},
{
name:"Jackie Chan",
image:"https://upload.wikimedia.org/wikipedia/commons/8/8f/Jackie_Chan_2012.jpg"
},
{
name:"Jenna Ortega",
image:"https://upload.wikimedia.org/wikipedia/commons/e/e7/Jenna_Ortega_2022.jpg"
},
{
name:"Scarlett Johansson",
image:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Scarlett_Johansson_C%C3%A9sar_2014.jpg"
},
{
name:"Chris Hemsworth",
image:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Chris_Hemsworth_2019.jpg"
},
{
name:"Tom Holland",
image:"https://upload.wikimedia.org/wikipedia/commons/5/53/Tom_Holland_2018.jpg"
},
{
name:"Emma Stone",
image:"https://upload.wikimedia.org/wikipedia/commons/3/33/Emma_Stone_2017.jpg"
},
{
name:"Ryan Gosling",
image:"https://upload.wikimedia.org/wikipedia/commons/2/2d/Ryan_Gosling_Cannes_2016.jpg"
}
];

function PopularPeople(){

return(

<div className="container mt-5">

<h2 className="section-title text-center mb-4">
⭐ Popular People
</h2>

<div className="people-grid">

{people.map((person,index)=>(
<div className="person-card" key={index}>

<img src={person.image} alt={person.name} />

<p>{person.name}</p>

</div>
))}

</div>

</div>

)

}

export default PopularPeople;