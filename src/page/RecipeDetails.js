import "../style/recipe.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await res.json();
            setRecipe(data.meals?.[0] || null);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            setRecipe(null);
        } finally {
            setLoading(false);
        }
        };
        fetchRecipe();
    }, [id]);

    if (loading) return <p>Loading recipe...</p>;
    if (!recipe) return <p>Recipe not found.</p>;

    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto", backgroundColor: "var(--card-bg)", padding: "2rem", borderRadius:"var(--card-bg)", marginBottom: "1rem" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "var(--border-radius)", marginBottom: "1rem" }} />
            <p><strong>Category:</strong> {recipe.strCategory}</p>
            <p><strong>Area:</strong> {recipe.strArea}</p>
            <p><strong>Instructions:</strong></p>
            <p style={{ lineHeight: "1.5" }}>{recipe.strInstructions}</p>
            <p style={{ lineHeight: "1.5" }}><strong>Ingredients:</strong></p>
            <ul style={{ listStyle: "disc", marginLeft: "1rem", padding: "1rem", margin: "1rem" }}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                return ingredient ? <li key={i}>{ingredient} - {measure}</li> : null;
                })}
            </ul>
        </div>
    )
}