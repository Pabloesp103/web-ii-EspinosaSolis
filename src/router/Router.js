import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";

export default function MyRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}