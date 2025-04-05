import "../style/products.css";
import { useNavigate } from "react-router-dom";
export default function ProductListItem ({ title, id, description, images }) {

    const navigate = useNavigate();

    const image = images?.[0] ?? ""

    return (
        <div className="product-list-item" key={id}>
            <div className="product-image">
                <img src={image} alt="Product" />
            </div>
            <div className="product-details">
                <h4>{title}</h4>
                <p>{description}</p>
                <a href={`/product-details/${id}`}>Ver producto</a>
            </div>
        </div>
    )
}