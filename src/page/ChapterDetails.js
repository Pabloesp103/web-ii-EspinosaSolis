import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import CharacterItem from "../components/CharacterItem";
import '../style/chapter.css'

export default function ChapterDetails() {
    const { chapterId } = useParams();
    const [chapterName, setChapterName] = useState("");
    const [chapterAirDate, setChapterAirDate] = useState("");
    const [chapterCode, setChapterCode] = useState("");
    const [characters, setCharacters] = useState([]);
    const [likedCharacters, setLikedCharacters] = useState([]);

    useEffect(() => {
        async function fetchChapter() {
            try {
                const res = await fetch(
                    `https://rickandmortyapi.com/api/episode/${chapterId}`
                );
                const data = await res.json();

                setChapterName(data.name);
                setChapterAirDate(data.air_date);
                setChapterCode(data.episode);

                const characterURL = data.characters.slice(0, 4);
                const fetchCharacters = await Promise.all(
                    characterURL.map((url) =>
                    fetch(url).then((res) => res.json()))
                );
                setCharacters(fetchCharacters);

                updateLikes();
            } catch(error) {
                console.error("Error al cargar el episodio", error);
            }
        }
        fetchChapter();
    }, [chapterId]);

    function getLikes(characterId) {
        const data = JSON.parse(localStorage.getItem("likedCharacters") || "{}" );
        return data[chapterId]?.[characterId] || 0;
    }

    function updateLikes() {
        const storedLikes = JSON.parse(
            localStorage.getItem("likedCharacters") || "{}"
        );

        const chapterLikes = storedLikes[chapterId] || {};

        const mostLiked = Object.entries(chapterLikes)
        .sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => id);

        Promise.all(
            mostLiked.map((id) =>
                fetch(`https://rickandmortyapi.com/api/character/${id}`)
                .then((res) =>
                    res.json()
                )
            )
        )
        .then((characters) => {
            setLikedCharacters(characters);
        });
    }

    function likeToCharacter(characterId) {
        const key = "likedCharacters";
        const data = JSON.parse(localStorage.getItem(key) || "{}");
    
        if (!data[chapterId]) data[chapterId] = {};
        if (!data[chapterId][characterId]) data[chapterId][characterId] = 0;
        data[chapterId][characterId] += 1;
        localStorage.setItem(key, JSON.stringify(data));

        updateLikes();
    }
    
    return(
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "'Helvetica Neue', sans-serif", textAlign: "center", color: "#333" }}>
            <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "300", letterSpacing: "1px", marginBottom: "1rem" }}>{chapterName}</h1>
                {chapterAirDate && chapterCode && (
                    <h2 style={{ fontSize: "1rem", color: "purple", marginBottom: "2rem" }}>{chapterCode} fue lanzado en {chapterAirDate}</h2>
                )}
            </div>

            <section>
                <h2 style={{ fontWeight: "bold", color: "purple", marginBottom: "1.5rem" }}>Personajes mas votados del capitulo</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "3rem" }}>
                    {likedCharacters.length === 0 ? (
                        <p>Aun no hay personajes votados para este episodio</p>
                    ) : (
                        likedCharacters.map((chr) => (
                            <div key={chr.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <CharacterItem character={chr} />
                                <p>{getLikes(chr.id)} likes</p>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section>
                <h3 style={{ marginBottom: "1rem", fontWeight: "bold" }}>Personajes del capitulo</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "6rem", marginTop: "1rem" }}>
                    {characters.map((chr) => (
                        <div key={chr.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CharacterItem character={chr} />
                            <p>{getLikes(chr.id)} likes</p>
                            <div>
                                <button onClick={() => likeToCharacter(chr.id)} style={{ padding: "0.5rem 1rem", backgroundColor: "purple", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "0.5rem" }}>Like</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

