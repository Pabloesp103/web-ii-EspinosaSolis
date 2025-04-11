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
        <div style={{ background: "linear-gradient(to bottom right, #1b1035, #3a1949)", color: "#1e1e1e", padding: "2rem", minHeight: "70vh", display: "flex", justifyContent: "center", alignContent: "center" }}>
            <div style={{ background: "#fff", borderRadius: "1.5rem", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", padding: "2rem", maxWidth: "900px", maxHeight: "30vh" }}>
                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    {loading ? (
                        <div>
                            <p>Loading details...</p>
                        </div>
                    ) : (
                        product && (
                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column"  }}>
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <h4>${product.price}</h4>
                                </div>

                                <div style={{ display: "flex", justifyContent: "center" }}>
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
            </div>
        </div>
    )
}

async function getProductById(id) {
    const product = await fetch(`https://dummyjson.com/products/${id}`);
    return product.json()
}