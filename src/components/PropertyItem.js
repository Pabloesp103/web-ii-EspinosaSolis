import "../style/property.css";
import { FaHome, FaUser } from "react-icons/fa";
import React from "react";

export default function PropertyItem({ property }) {
    return(
        <div>
            <div>
                <div>
                    {property.superhost && (
                        <span>Superhost ⭐</span>
                    )}
                    <img src={property.image} alt={property.title}/>
                </div>
                <div>
                    <div>
                        <h3>{property.title}</h3>
                    </div>
                    <p>{property.description}</p>
                    <div>
                        <div>
                            <FaHome />
                            <p>{property.capacity.bedroom} BedRoom</p>
                        </div>
                        <div>
                            <FaUser />
                            <p>{property.capacity.people} Guest</p>
                        </div>
                    </div>
                    <div>
                        <p>${property.price} /night</p>
                        <div>
                            <p>⭐ {property.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}