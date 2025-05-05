import "../style/property.css";
import React, { useState, useEffect } from "react";
import HeroComp from "../components/HeroComp";
import PropertyItem from "../components/PropertyItem";

export default function Home() {
    const [search, setSearch] = useState("");
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json")
        .then((response) => response.json())
        .then((data) => {
            setProperties(data);
        })
        .catch((error) => {
            console.error("Error en el fetch", error);
        });
    }, []);

    const filterResult = search.trim() === "" ? properties : properties.filter((property) =>
    property.description && property.description.includes(search)
);

    return (
        <div class="Main-Container" style={{ backgroundSize: "cover", backgroundColor: "#0d0d1a" }}>
            <HeroComp inputChange={setSearch} />

            {search.length <= 0 ? (
                <p>No se ha podido encontrar "{search}"</p>
            ) : null}

            <div className="properties">
                {filterResult.map((property) => (
                    <PropertyItem key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
}