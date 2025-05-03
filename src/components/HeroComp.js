import "../style/property.css";
import React from "react";

    const mainImage = new URL();

    export default function HeroComp({ inputChange }) {
        const handleInput = (e) => {
            inputChange(e.target.value);
        };

        return (
            <section>
                <div class="hero-content">
                    <img src="https://cdn.pixabay.com/photo/2019/07/15/08/32/australia-4338882_1280.jpg" alt="background"/>
                    <div>
                        <h2>Book unique places to stay and things to do.
                        <br />
                        Unforgettable trips start with Airbnb.</h2>
                        <div>
                            <input type="text" placeholder="Search..." className="search-bar" onChange={handleInput}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }