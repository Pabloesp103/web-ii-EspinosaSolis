import "../style/property.css";
import { FaHome, FaUser } from "react-icons/fa";
import React from "react";

export default function PropertyItem({ property }) {
    return(
        <div style={{ backgroundColor: "#13132b", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{  }}>
                    {property.superhost && ( <span style={{ backgroundColor: "#612041", color: "#f8ebf2", borderRadius: "4px", padding: "4px 8px", fontWeight: "bold", position: "absolute", marginLeft: "27spx", marginTop: "12px" }}>Superhost ⭐</span> )}
                    <img src={property.image} alt={property.title} style={{ width: "100%", height: "180px", objectFit: "cover" }}/>
                </div>
                <div style={{ color: "white", padding: "16px" }}>
                    <h3 style={{ margin: "0 0 6px" }}>{property.title}</h3>
                    <p style={{ color: "#ccc", marginBottom: "12px" }}>{property.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" , color: "#ccc", marginBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <FaHome />
                            <p>{property.capacity.bedroom} BedRoom</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <FaUser />
                            <p>{property.capacity.people} Guest</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontWeight: "bold" }}>${property.price} /night</p>
                        <p>⭐ {property.rating}</p>
                    </div>
                </div>
        </div>
    );
}