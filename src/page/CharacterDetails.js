import { useParams, Link } from "react-router-dom";
import { useEffect , useState } from "react";
import "../style/chapter.css";

export default function CharacterDetails() {
    const { characterId } = useParams();
    const [character, setChatacter] = useState(null);
    const [chapter, setChapter] = useState({ first: null, last: null });

    useEffect(() => {
        const fetchCharacter = async () => {
            const res = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
            const data = await res.json();
            if (data.error) { setChatacter(null); } else {
                setChatacter(data);

                if (data.episode.length > 0) {
                    const first = data.episode[0].split("/").pop();
                    const last = data.episode[data.episode.length - 1].split("/").pop();

                    const [firstCh, lastCh] = await Promise.all([
                        fetch(`https://rickandmortyapi.com/api/episode/${first}`).then((res) => res.json()),
                        fetch(`https://rickandmortyapi.com/api/episode/${last}`).then((res) => res.json()),
                    ]);
                    setChapter({ first: firstCh, last: lastCh });
                }
            }
        };
        fetchCharacter();
    }, [characterId]);

    if (!character) {
        return (
            <section>
                <div>
                    <h1>No se encontro personaje</h1>
                    <Link to="/characters">Volver a personajes</Link>
                </div>
            </section>
        );
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <div style={{ backgroundColor: "#ebf8f2", borderRadius: "10px", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "20rem", width: "100%", marginBottom: "2rem" }}>
                <h2 style={{ marginBottom: "1rem" }}>{character.name}</h2>

                <p style={{ marginBottom: "0.2rem" }}><strong>Status:</strong> {character.status}</p>
                <p style={{ marginBottom: "0.2rem" }}><strong>Species:</strong> {character.species}</p>
                <p style={{ marginBottom: "0.2rem" }}><strong>Type:</strong> {character.type}</p>
                <p style={{ marginBottom: "0.2rem" }}><strong>Gender:</strong> {character.gender}</p>
                <p style={{ marginBottom: "0.2rem" }}><strong>Origin:</strong> {character.origin.name}</p>
                <p style={{ marginBottom: "0.4rem" }}><strong>Current location:</strong> {character.location.name}</p>

                <div style={{ marginBottom: "0.8rem", textAlign: "center" }}>
                    {chapter.first && (
                        <p style={{ marginBottom: "0.3rem" }}>
                            <strong>First Chapter:</strong>{" "}
                            <Link to={`/chapter/${chapter.first.id}`}>{chapter.first.name}</Link>
                        </p>
                    )}
                    {chapter.last && (
                        <p style={{ marginBottom: "0.3rem" }}>
                            <strong>Last Chapter:</strong>{" "}
                            <Link to={`/chapter/${chapter.last.id}`}>{chapter.last.name}</Link>
                        </p>
                    )}
                </div>

                <div>
                    <img src={character.image} alt={character.name} style={{ borderRadius: "8px", maxWidth: "100%" }} />
                </div>
            </div>
        </div>
    );
}