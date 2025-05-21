import React, { useEffect, useState} from "react";
import CharacterItem from "../components/CharacterItem";
import "../style/chapter.css";

export default function Characters() {
    const [character, setCharacter] = useState([]);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({});
    const [attributes, setAttributes] = useState({
        name: "",
        status: "",
        species: "",
        gender: "",
    });

    const fetchCharacters = async () => {
        const attrs = new URLSearchParams({ page, ...attributes });
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${attrs}`);
        const data = await res.json();
        setCharacter(data.results || []);
        setInfo(data.info || {});
    };

    useEffect(() => {
        fetchCharacters();
    }, [page, attributes]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAttributes((prev) => ({ ...prev, [name]: value }));
        setPage(1);
    };

    return(
        <div>
            <div>
                <h1 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "2rem" }}>Lista de Personajes</h1>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", margin: "1rem 0", justifyContent: "center" }} className="input-container">
                    <input name="name" placeholder="Nombre" onChange={handleInput}/>
                    <select name="status" onChange={handleInput}>
                        <option value="">Status</option>
                        <option value="alive">Vivo</option>
                        <option value="dead">Muerto</option>
                        <option value="unknown">Desconocido</option>
                    </select>
                    <input name="species" placeholder="Especie" onChange={handleInput}/>
                    <select name="gender" onChange={handleInput}>
                        <option value="">Genero</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="genderless">Sin Genero</option>
                        <option value="unknown">Desconocido</option>
                    </select>
                    <input name="type" placeholder="Tipo" onChange={handleInput}/>
                </div>
            </div>

            <div  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", padding: "2rem" }}>
                {character.map((character) => (
                    <CharacterItem key={character.id} character={character} />
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "2rem", marginBottom: "3rem" }}>
                {page > 2 && <span style={{ color: "#2a813d", fontSize: "1.5rem", padding: "0 0.5rem" }}>...</span>}

                {[...Array(info.pages || 0).keys()].slice(Math.max(0, page - 3), Math.min(page + 2, info.pages)).map((p) => (
                    <button key={p + 1} onClick={() => setPage(p + 1)} style={{ backgroundColor: "2a2a40", color: "#2a813d", border: "2px solid #2a813d", borderRadius: "10px", padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>{p + 1}</button>
                ))}

                {page < info.pages - 1 && <span style={{ color: "#2a813d", fontSize: "1.5rem", padding: "0 0.5rem" }}>...</span>}
            </div>
        </div>
    );
}