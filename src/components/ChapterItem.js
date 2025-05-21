import "../style/chapter.css";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";


    const LOCAL_STORAGE_KEY = 'chapter-likes';

    const getStorageLikes = () => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    }

    const setStorageLikes = (chapterId, likes, dislikes) => {
        const data = getStorageLikes();
        data[chapterId] = { likes, dislikes };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }


    const initialState = { likes: 0, dislikes: 0 };

    function actionReducer(state, action) {
        switch (action.type) {
            case "SET":
                return { likes: action.likes, dislikes: action.dislikes };
            case "LIKE":
                return { ...state, likes: state.likes + 1 };
            case "DISLIKE":
                return { ...state, dislikes: state.dislikes + 1 };
            default:
                return state;
        }
    }



    export default function ChapterItem ({ episode }) {

        const season = episode.episode.slice(1, 3);
        const [state, dispatch] = useReducer(actionReducer, initialState);

        useEffect(() => {
            const storedData = getStorageLikes();
            if (storedData[episode.id]) {
                dispatch({
                    type: "SET",
                    likes: storedData[episode.id].likes,
                    dislikes: storedData[episode.id].dislikes
                });
            }
        }, [episode.id]);

        const handleLikes = () => {
            dispatch({ type: "LIKE" });
            setStorageLikes(episode.id, state.likes + 1, state.dislikes);
        };

        const handleDislikes = () => {
            dispatch({ type: "DISLIKE" });
            setStorageLikes(episode.id, state.likes, state.dislikes + 1);
        };

        return (
            <div className="chapter-list-item">
                <div style={{ backgroundColor: "#2a2a40", padding: "1.5rem", borderRadius: "10px", textDecoration: "none", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <span>Episodio: {episode.episode}</span>
                    </div>

                    <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#61dafb" }}>{episode.name}</h2>
                    <p style={{ margin: "0.2rem 0", fontSize: "0.95rem", color: "#ccc" }}>Dia de lanzamiento: {episode.air_date}</p>
                    <div>
                        <Link to={`/chapter/${episode.id}`}>Ver Detalles</Link>
                    </div>
                    <div style={{ padding: "1rem", justifyContent: "center", display: "flex", gap: "3rem" }}>
                        <button onClick={handleLikes} style={{ backgroundColor: "#79ffc1", borderRadius: "5px"}}>Like ({state.likes})</button>
                        <button onClick={handleDislikes} style={{ backgroundColor: "#ef4646", borderRadius: "5px" }}>Dislike ({state.dislikes})</button>
                    </div>
                </div>
            </div>
        )
    }