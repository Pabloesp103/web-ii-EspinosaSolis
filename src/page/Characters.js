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
        const attrs = URLSearchParams({ page, ...attributes });
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
                <h1>Lista de Personajes</h1>
                <div>
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

            <div>
                {character.map((character) => (
                    <CharacterItem key={character.id} character={character} />
                ))}
            </div>

            <div>
                {page > 2 && <span>...</span>}

                {[...Array(info.pages || 0).keys()].slice(Math.max(0, page - 3), Math.min(page + 2, info.pages)).map((p) => (
                    <button key={p + 1} onClick={() => setPage(p + 1)}>{p + 1}</button>
                ))}

                {page < info.pages - 1 && <span>...</span>}
            </div>
        </div>
    );
}