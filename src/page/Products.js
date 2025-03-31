import { useNavigate } from "react-router-dom";
import ProductListItem from "../components/ProductListItem";
import { useEffect , useState } from "react";
import "../style/products.css";


export default function Products() {

const [products , setProducts] = useState([]);
const [productId, setProductId] = useState(null);
const [word, setWord] = useState("");


useEffect(() => {
    
    const fetchProducts = async () => {
        const data = await getProducts();
            console.log(data)
            setProducts(data.products)

    }

    fetchProducts()
}, [])

useEffect(() => {
    const hasWord = word !== null && word !== undefined && word.length > 3;

    if(!hasWord) return;

    const fetchProductsByWord = async() => {
        try{const data = await getProductsByWord(word);
            setProducts(data.products)}

        catch(error) {console.log(error)}
    }

    fetchProductsByWord()
}, [word])

return (
    <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <input 
            style={{ padding: "20px", width: "90%", margin: "auto" }}
            onChange={(e) => {
                console.log(products)
                setWord(e.target.value)}} />
        </div>
        <div className="container-products">
            {products && products.map((item) => {
                return (
                    <ProductListItem
                        title={item.title}
                        id={item.id}
                        description={item.description}
                        images={item.images}
                    />
                )
            })}

            {(!products || products.length === 0) &&
            <p className="no-product">No se pudo encontrar ningun producto.</p>
            }
            
        </div>
    </div>
)

//    const hasTokenInLocalStorage = localStorage.getItem("token") !== null;
//    const navigate = useNavigate()

//    if (!hasTokenInLocalStorage) {
//        window.location.href = "/login"
//        return;
//    }

    return (
        <div>
            <div className="container-products">
                {products && products.map((item) => {
                    return (
                        <ProductListItem
                        title={item.title}
                        id={item.id}
                        description={item.description}
                        images={item.images}
                        />
                    )
                })}
            </div>
        </div>
    );
}

async function getProducts() {
    const products = await fetch("https://dummyjson.com/products");
    return products.json();
}

async function getProductsByWord(word){
    const products = await fetch(`https://dummyjson.com/products/search?q=${word}`);
    console.log(products)
    return products.json();
}