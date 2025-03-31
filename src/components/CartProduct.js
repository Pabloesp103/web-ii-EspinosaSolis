import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartProduct({
    name,
    id,
    description,
    image,
    price,
    ammount,
    removeCart,
    updateAmmount,
    increment,
}) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const images =
      image?.[0] ??
      "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png";

      useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch(error) {
                console.error(", ~ fetLogIn ~ error:", error);
                setLoading(false);
            }
        };

        fetchProduct();
      }, [id]);
}