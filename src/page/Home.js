import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div style={{ justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 style={{ marginTop: "6rem", marginBottom: "3rem" }}>Bienvenido a la pagina de Rick and Morty!</h1>
                <p style={{ marginBottom: "4rem" }}>Aqui puedes encontrar diversos episodios y a sus respectivos personajes.</p>
            </div>
            <div>
                <h2 style={{ textAlign: "center" }}>En esta pagina puedes:</h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem 25rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h3>Ir a la lista de Episodios</h3>
                        <Link to="/chapters">
                            Lista de Episodios
                        </Link>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <h3>Ver la lista de Personajes</h3>
                        <Link to="/characters">
                            Lista de Personajes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
