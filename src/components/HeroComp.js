import "../style/property.css";
import React from "react";

    export default function HeroComp({ inputChange }) {
        const handleInput = (e) => {
            inputChange(e.target.value);
        };
        
        return (
            <section style={{  backgroundImage: "url('https://cdn.pixabay.com/photo/2019/07/15/08/32/australia-4338882_1280.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "180px 20px", textAlign: "center", color: "white" }}>
                <div class="hero-content" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <div>
                        <h2>Book unique places to stay and things to do.
                        <br />
                        Unforgettable trips start with Airbnb.</h2>
                        <div>
                            <input type="text" placeholder="Search..." className="search-bar" onChange={handleInput} style={{ padding: "12px 20px", borderRadius: "8px", border: "none", width: "100%", maxWidth: "400px", marginTop: "20px" }}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }