import "../style/recipe.css";
import React from "react";
import { Link } from "react-router-dom";

export default function RecipeItem({ recipes }) {
    return (
        <div className="recipes">
            {recipes.map(recipe => (
                <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal} style={{ backgroundColor: "var(--card-bg)", borderRadius: "var(--border-radius)", overflow: "hidden", cursor: "pointer", textDecoration: "none" }}>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: "100%", height: "250px", objectFit: "cover" }}/>
                    <p style={{ padding: "0.8rem", margin: "0", fontSize: "1.2rem", color: "white", fontFamily: "bold" }}>{recipe.strMeal}</p>
                </Link>
            ))}
        </div>
    );
}