import { useNavigate } from "react-router-dom";
import ProductListItem from "../components/ProductListItem";
import { useEffect , useState } from "react";
import "../style/products.css";

export default function Product() {
    const [product, setProduct] = useState(null);
    const [productId, setProductId] = useState(null);
    const [word, setWord] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);

            const data = await getProducts();
            setProduct(data.products);
            console.log(data);

            setLoading(false);
        }
        fetchProduct()
    }, []);

useEffect(() => {
    const hasWord = word !== null && word !== undefined && word.length > 0;

    if(!hasWord) return;

    const fetchProductsByWord = async() => {
        try{const data = await getProductsByWord(word);
            setProduct(data.products)}

        catch(error) {console.log(error)}
    }

    fetchProductsByWord()
}, [word])




    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <input 
                style={{ padding: "20px", width: "90%", margin: "auto", marginTop: "1rem", marginBottom: "5rem" }}
                onChange={(e) => {
                    setWord(e.target.value)}} />
            </div>
            <div className="container-products">
                
                {product && product.map((item) => {
                    return (
                        <ProductListItem
                            title={item.title}
                            id={item.id}
                            description={item.description}
                            images={item.images}
                        />
                    )
                })}
        
                {(!product || product.length === 0) &&
                <p className="no-product">No se pudo encontrar ningun producto.</p>
                }
                    
            </div>
        </div>
    )



    async function getProducts() {
        const product = await fetch("https://dummyjson.com/products");
        return product.json();
    }

    async function getProductsByWord(word) {
        const product = await fetch(`https://dummyjson.com/products/search?q=${word}`);
        console.log(product)
        return product.json();
    }
}