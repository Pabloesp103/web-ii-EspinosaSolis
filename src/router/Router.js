import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";
import RecipeDetails from "../page/RecipeDetails";

export default function MyRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
    )
}