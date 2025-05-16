import "../style/recipe.css";
import React from "react";

export default function CategoryItem({ categories, selected, onSelect }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Categories</h2>
            {categories.map(ctg => (
                <button key={ctg.idCategory} onClick={() => onSelect(ctg.strCategory)} style={{ backgroundColor: "#0f0f2d", border: "2px solid #1e1e3f", color: "white", padding:"0.3rem", borderRadius:"var(--border-radius)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "1rem"}}>
                    <img src={ctg.strCategoryThumb} alt={ctg.strCategory} style={{ width: "30px", height: "30px", objectFit: "cover", borderRadius: "50%" }}/>
                    {ctg.strCategory}
                </button>
            ))}
        </div>
    );
}