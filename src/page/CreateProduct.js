import { useEffect, useState } from 'react';
import '../style/products.css'
import CreateProductActions from '../functions/CreateProductActions';
import { useFormStatus } from 'react-dom';

export default function CreateProducts() {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('https://dummyjson.com/products/categories')
            const data = await response.json()
            setCategories(data);
        }

        fetchCategories()
    }, [])

    async function submitAction(formData) {
        const data = Object.fromEntries(formData)
        const response = await CreateProductActions(data)

        if (response?.id === undefined) {
            alert("Error al crear el producto");
            return;
        }

        const newProducts = localStorage.getItem("newProducts") != null ? JSON.parse(localStorage.getItem("newProducts")) : [];

            newProducts.push(response);

            const newProductsString = JSON.stringify(newProducts);
            localStorage.setItem("newProducts", newProductsString);
            alert("Producto creado exitosamente");
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>Create Product</h1>
            </div>

            <div>
                <div>
                    <h4>Title</h4>
                    <input style={{ display: "flex", width: "100%", borderRadius: "4px", boxSizing: "border-box", padding: "10px" }} name='title'/>
                </div>

                <div>
                    <h4>Description</h4>
                    <input name='description' />
                </div>

                <div>           
                    <div>
                        <h4>Categories</h4>
                        <label>Categories</label>
                        <select required name='category'>
                            {categories.map((category) => (
                                <option key={category.slug} value={category.slug}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h4>Price</h4>
                        <input name='price' />
                    </div>
                </div>

                <div>
                    <ButtonSave />
                </div>
            </div>
        </div>
        );

}


function ButtonSave() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="btn-save">
            {pending ? "Saving..." : "Save"}
        </button>
    )
}