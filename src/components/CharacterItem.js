import "../style/chapter.css";
import React from "react";
import { Link } from "react-router-dom";

export default function CharacterItem({ character }) {
    <Link to={`/character/${character.id}`}>
        <div>
            <div>
                <img src={character.image} alt={character.name}/>
            </div>
            <h2>{character.name}</h2>
            <p>Estado: {character.status} - Especie: {character.species}</p>
            <p>Tipo: {character.type || "Desconocido"}</p>
            <p>Origen: {character.origin.name}</p>
            <p>Ubicacion: {character.location.name}</p>
        </div>
    </Link>
}