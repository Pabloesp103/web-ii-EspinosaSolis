import '../style/products.css'
import CartProduct from '../components/CartProduct';
import { useEffect, useState } from 'react';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(saved);
        
        totalPrice(saved);
    }, []);

    const totalPrice = (cart) => {
        const finalPrice = cart.reduce(
            (accumulator, item) => accumulator + item.price * item.ammount, 
            0
        );
        setTotal(finalPrice);

        if (cart.length > 5) {
            setError("No se puede tener mas de 5 productos diferentes.");
        } else if (finalPrice > 10000) {
            setError("El precio total no puede ser mayor a $10,000.");
        } else {
            setError("");
        }
    };

    const removeCart = (id) => {
        const updateCart = cart.filter((item) => item.id !== id);
        setCart(updateCart);
        localStorage.setItem("cart", JSON.stringify(updateCart));
        totalPrice(updateCart);
    }

    const updateAmmount = (id, updAmmount) => {
        const updateCart = cart.map((item) => 
            item.id === id ? { ...item, ammount: updAmmount } : item
        );

        setCart(updateCart);
        localStorage.setItem("cart", JSON.stringify(updateCart));
        totalPrice(updateCart);
    };

    const increment = (item) => {
        const newTotal = total + item.price;
        return newTotal <= 10000;
    }


    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Carrito de Compras</h1>

            <div>
                {cart.length === 0 ? (
                    <p>Carrito Vacio</p>
                ) : (
                    cart.map((item) => (
                        <CartProduct 
                        key={item.id}
                        name={item.name}
                        id={item.id}
                        description={item.description}
                        image={item.image}
                        price={item.price}
                        ammount={item.ammount}
                        removeCart={removeCart}
                        updateAmmount={updateAmmount}
                        increment={increment(item)}
                        />
                    ))
                )}
            </div>

            <div>
                <h3>Precio Final</h3>
                <div>
                    <p>${total}</p>
                </div>
            </div>
        </div>
    )
}