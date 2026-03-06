import React from "react";

function Footer() {

const scrollTop = () => {
window.scrollTo({
top:0,
behavior:"smooth"
});
};

return (

<footer className="footer-section">

<div className="footer-box container">

<div className="footer-content">

<img
src="https://cdn-icons-png.flaticon.com/512/3659/3659898.png"
alt="movie icon"
className="footer-icon"
/>

<h3>good films make your life better!</h3>

</div>

<hr />

<div className="footer-bottom">

<button className="back-top" onClick={scrollTop}>
⬆ Back to top
</button>

</div>

</div>

</footer>

);

}

export default Footer;