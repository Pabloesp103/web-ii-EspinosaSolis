import "../style/recipe.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            setRecipe(data.meals[0]);
        })
        .catch((error) => {
            console.error("Error en el fetch", error);
        });
    }, [id]);

    return (
        <div>
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p><strong>Category:</strong> {recipe.strCategory}</p>
            <p><strong>Area:</strong> {recipe.strArea}</p>
            <p><strong>Instructions:</strong></p>
            <p>{recipe.strInstructions}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                return ingredient ? <li key={i}>{ingredient} - {measure}</li> : null;
                })}
            </ul>
        </div>
    )
}