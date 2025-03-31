import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";

export default function Product() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(id);
            console.log(" ~ fetchProduct ~ data", data)
            setProduct(data)
        }

        fetchProduct()
    }, [id])

    return (
        <div>
            {product && <ProductListItem 
            title={product.title} 
            id={product.id}
            description={product.description}
            images={product.images}
            />
            }
        </div>
    )
}

async function getProductById(id) {
    const product = fetch(`https://dummyjson.com/products/${id}`);
    return product.json()
}