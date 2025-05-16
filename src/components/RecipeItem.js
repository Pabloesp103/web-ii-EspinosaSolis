import "../style/recipe.css";
import React from "react";
import { Link } from "react-router-dom";

export default function RecipeItem({ recipes }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {recipes.map(recipe => (
                <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal} style={{ backgroundColor: "var(--card-bg)", borderRadius: "var(--border-radius)", overflow: "hidden", cursor: "pointer" }}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: "100%", height: "160px", objectFit: "cover" }}/>
                <p style={{ padding: "0.8rem", margin: "0", fontSize: "1rem", fontWeight: "500" }}>{recipe.strMeal}</p>
                </Link>
            ))}
        </div>
    );
}