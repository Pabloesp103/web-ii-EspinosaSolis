import ChapterItem from "../components/ChapterItem";
import { useEffect , useState } from "react";
import "../style/chapter.css";

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
        <div>
            <h1>Lista de Episodios</h1>
            {Object.entries(seasonChapter).map(([seasonChapter, episodes]) => (
                <div key={season}>
                    <h2>{season}</h2>
                    <div>
                        {episodes.map(ch => (
                            <ChapterItem key={ch.id} episode={ch} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};