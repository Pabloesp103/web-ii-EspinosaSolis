import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartProduct({
    name,
    id,
    description,
    images,
    price,
    ammount,
    removeCart,
    updateAmmount,
    increment,
}) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const image = "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png";

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



///////////////////

      const remove = () => {
        removeCart(id);
      };

      const increase = () => {
        if (increment && product.stock >= ammount) {
            updateAmmount(id, ammount + 1);
        }
      };

      const decrease = () => {
        if (ammount > 1) {
            updateAmmount(id, ammount - 1);
        }
      };

      return (
        <div className="cart-product" key={id}>
            <div className="cart-img"  style={{ textAlign: "center" }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <img src={product?.images?.[0] || image} alt={product?.name || "Product"} />
                )}
            </div>
            <div>
                <div className="cartTitle" >
                    <h4>{product?.title}</h4>
                    <p>{product?.description}</p>
                    <div>
                        <p  style={{ textAlign: "center" }}>En stock: {product?.stock}</p>
                    </div>
                </div>
                <div className="total-price" style={{ textAlign: "center" }}>
                    <p>${(price * ammount)}</p>
                </div>
                <div className="amm-btns" style={{ textAlign: "center", gap: "5px", padding: "5px" }}>
                    <button onClick={decrease} className="ammount-btn">-</button>
                    <span  style={{ marginLeft:"10px", marginRight: "10px"}}>{ammount}</span>
                    <button onClick={increase} className={`ammount-btn ${(!increment || product?.stock <= ammount) ? 'disabled' : ''}`} disabled={(!increment || product?.stock <= ammount)}>+</button>
                </div>
                <div style={{ justifyContent: "center", display: "flex", marginTop: "20px" }}>
                    <button onClick={remove}>Eliminar</button>
                </div>
            </div>
        </div>
      );
}