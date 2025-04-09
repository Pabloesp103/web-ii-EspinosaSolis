import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";
import '../style/products.css'

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(null);

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);

            const data = await getProductById(id);
            console.log(" ~ fetchProduct ~ data", data);
            setProduct(data);

            setLoading(false);
        }

        fetchProduct()
    }, [id]);

    const addCart = () => {
        if (!product) return;

        if(!Array.isArray(cart)) {
            setCart([]);
            localStorage.setItem("cart", JSON.stringify([]));
            return;
        }

        if (cart.length >= 5) {
            alert("No se puede tener mas de 5 productos diferentes.");
            return;
        }

        const totalCart = cart.reduce((sum, item) => sum + item.price * item.ammount, 0);
        if (totalCart + product.price > 10000) {
            alert("El precio total no puede ser mayor a $10,000.");
            return;
        }

////////////////////////////////////

        const repeatedItem = cart.find((item) => item.id === product.id);
        if (!repeatedItem) {
            const updCart = [...cart, {id: product.id, price: product.price, ammount: 1}];
            setCart(updCart);
            localStorage.setItem("cart", JSON.stringify(updCart));
        }
    }

    const inCart = Array.isArray(cart) && cart.some((item) => item.id === product?.id);

    const image = "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png";

/////////////////////////////////////

    return (
        <div>
            {loading ? (
                <div>
                    <p>Loading details...</p>
                </div>
            ) : (
                product && (
                    <div>
                        <div>
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <h5>${product.price}</h5>
                        </div>

                        <div>
                            {inCart ? (
                                <button className="alrCartBtn" disabled>Ya en el carrito</button>
                            ) : (
                                <button onClick={addCart}>Agregar al carrito</button>
                            )
                        }
                        </div>
                    </div>
                )
            )
            }
        </div>
    )
}

async function getProductById(id) {
    const product = await fetch(`https://dummyjson.com/products/${id}`);
    return product.json()
}