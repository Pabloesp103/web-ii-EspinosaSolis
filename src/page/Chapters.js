import ChapterItem from "../components/ChapterItem";
import { useEffect , useState } from "react";
import "../style/chapterlist.css";

export default function Chapters() {
    const [seasonChapter, setSeasonChapter] = useState({});

    useEffect(() => {
        const fetchChapters = async () => {
            let chapters = [];
            let constUrl = "https://rickandmortyapi.com/api/episode";

            while (constUrl) {
                const res = await fetch(constUrl);
                const data = await res.json();
                chapters = [...chapters, ...data.results];
                constUrl = data.info.next;
            }

            const perSeason = chapters.reduce((stored, episode) => {
                const seasonId = episode.episode.slice(1, 3);
                const seasonKey = `Season ${parseInt(seasonId)}`;
                if (!stored[seasonKey]) stored[seasonKey] = [];
                stored[seasonKey].push(episode);
                return stored;
            }, {});

            setSeasonChapter(perSeason);
        };
        fetchChapters()
    }, []);




    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "auto" }}>
            <h1 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "2rem" }}>Lista de Episodios</h1>
            {Object.entries(seasonChapter).map(([season, episodes]) => (
                <div key={season} style={{ marginBottom: "3rem" }}>
                    <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#ffcc00" }}>{season}</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                        {episodes.map(ch => (
                            <ChapterItem key={ch.id} episode={ch} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};