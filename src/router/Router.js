import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";
import Chapters from "../page/Chapters";
import ChapterDetails from "../page/ChapterDetails";
import Characters from "../page/Characters";
import CharacterDetails from "../page/CharacterDetails";

export default function MyRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/chapter/:chapterId" element={<ChapterDetails />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/character/:characterId" element={<CharacterDetails />} />
        </Routes>
    )
}