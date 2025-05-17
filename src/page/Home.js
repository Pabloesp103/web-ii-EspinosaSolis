import "../style/recipe.css";
import React, { useState, useEffect } from "react";
import RecipeItem from "../components/RecipeItem";
import CategoryItem from "../components/CategoryItem";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Desert');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name');

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => response.json())
        .then((data) => {
            setCategories(data.categories);
        })
        .catch((error) => {
            console.error("Error en el fetch", error);
        });
    }, []);


    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
            setRecipes(data.meals || []);
        })
        .catch((error) => {
            console.error("Error en el fetch", error);
        });
    }, [selectedCategory]);



    const handleSort = (recipes) => {
        return [...recipes].sort((a, b) => {
            if (sort === 'name') return a.strMeal.localeCompare(b.strMeal);
            return a.idMeal - b.idMeal;
        });
    };

    const handleSearch = (recipes) => {
        return recipes.filter(recipe => 
            recipe.strMeal.toLowerCase().includes(search.toLowerCase())
        );
    };
    
    return (
        <div className="container" style={{  }}>
            <section className="main-image" style={{ backgroundImage: "url('https://png.pngtree.com/background/20230513/original/pngtree-kitchen-cupboard-cartoon-picture-image_2511551.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "180px", textAlign: "center", color: "white" }}>
                <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                    <h1 style={{fontSize: "3rem", color: "purple" }}>Chefs Academy Secrets</h1>
                    <p style={{ fontSize: "1.2rem", color: "brown" }}>New recipe for you to try out, let's cook!</p>
                </div>
            </section>

            <div className="home-container">
                <aside className="ctg-container">
                    <CategoryItem categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
                </aside>
                <div style={{ minWidth: "80%" }}>
                    <div className="search-bar">
                        <input type="text" placeholder="🔎 Search recipes and more..." value={search} onChange={(e) => setSearch(e.target.value)} className="search" style={{ padding: "0.8rem", flex: "1", borderRadius: "var(--border-radius)", border: "none", fontSize: "1rem", backgroundColor: "#0f0f2d", border: "2px solid #1e1e3f" }}/>
                        <select onChange={(e) => setSort(e.target.value)} value={sort} className="sort">
                            <option value="name">Sort by Name</option>
                            <option value="id">Sort by ID</option>
                        </select>
                    </div>
                    <RecipeItem recipes={handleSort(handleSearch(recipes))} />
                </div>
            </div>
        </div>
    );
}