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
            setProduct(data.product);

            setLoading(false);
        }
        fetchProduct()
    }, []);

    useEffect(() => {
        const hasWord = word !== null && word !== undefined && word.lenght > 0;

        if(!hasWord) return;

        const fetchWordProducts = async () => {
            setLoading(true);

            const data = await getProductsByWord(word)
            setProduct(data.products);

            setLoading(false);
        }

        fetchWordProducts();
    }, [word])




    return (
        <div>

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