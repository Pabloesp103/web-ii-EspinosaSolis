import "../style/chapter.css";
import React from "react";
import { Link } from "react-router-dom";

export default function CharacterItem({ character }) {
    return(
        <div style={{ backgroundColor: "#ebf8f2", borderRadius: "10px", padding: "1rem" }}>
            <Link to={`/character/${character.id}` }  style={{ textDecoration: "none", color: "inherit" }}>
                <div>
                    <div style={{ width: "100%" }}>
                        <img src={character.image} alt={character.name} style={{ backgroundSize: "cover", width: "100% " }}/>
                    </div>
                    <h2>{character.name}</h2>
                    <p>Estado: {character.status} - Especie: {character.species}</p>
                    <p>Tipo: {character.type || "Desconocido"}</p>
                    <p>Origen: {character.origin.name}</p>
                    <p>Ubicacion: {character.location.name}</p>
                </div>
            </Link>
        </div>
    );
}