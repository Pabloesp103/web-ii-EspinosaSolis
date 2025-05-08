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
        return data[episodeId]?.[characterId] || 0;
    }

    function updateLikes() {
        const storedLikes = JSON.parse(
            localStorage.getItem("likedCharacters") || "{}"
        );

        const chapterLikes = storedLikes[episodeId] || {};

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
    
        if (!data[episodeId]) data[episodeId] = {};
        if (!data[episodeId][characterId]) data[episodeId][characterId] = 0;
        data[episodeId][characterId] += 1;
        localStorage.setItem(key, JSON.stringify(data));

        updateLikes();
    }
    
    return(
        <div>
            <div>
                <h1>{chapterName}</h1>
                {chapterAirDate && chapterCode && (
                    <h2>{chapterCode} fue lanzado en {chapterAirDate}</h2>
                )}
            </div>

            <section>
                <h2>Personajes mas votados del capitulo</h2>
                <div>
                    {likedCharacters.length === 0 ? (
                        <p>Aun no hay personajes votados para este episodio</p>
                    ) : (
                        likedCharacters.map((chr) => (
                            <div key={chr.id}>
                                <CharacterItem character={chr} />
                                <p>{getLikes(chr.id)} likes</p>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section>
                <h3>Personajes del capitulo</h3>
                <div>
                    {characters.map((chr) => (
                        <div key={chr.id}>
                            <CharacterItem character={chr} />
                            <p>{getLikes(chr.id)} likes</p>
                            <div>
                                <button onClick={() => likeToCharacter(chr.id)}>Like</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

