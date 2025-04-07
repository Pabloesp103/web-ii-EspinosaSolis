import { useState } from "react";

export default function Calculadora() {
    const [numero_1, setNumero_1] = useState(0);
    const [numero_2, setNumero_2] = useState(0);
    const [total, setTotal] = useState(0);
    const [operador, setOperador] = useState("");

    function sumar() {
        const total_suma = numero_1 + numero_2;
        setTotal(total_suma);
    }

    function restar() {
        const total_resta = numero_1 - numero_2;
        setTotal(total_resta);
    }

    function asignarValor(numero) {
        if (operador === "") setNumero_1(numero);
        if (operador !== "") setNumero_2(numero);
    }

    function asignarTotal() {
        if (operador === "+") sumar();
        if (operador === "-") restar();

        setNumero_1(0);
        setNumero_2(0);
        setOperador("");
    }

    return (
        <div style={{ textAlign: "center" }}>

            <h2>Total {total}</h2>

            <h3>Primer Numero: {numero_1}</h3>

            <h3>Operador presionado: {operador}</h3>

            <h3>Segundo Numero: {numero_2}</h3>

            <div style={{ display: "flex", justifyContent: "center", padding: "10px", gap: "30px" }}>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(1)}>1</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(2)}>2</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(3)}>3</button>
                </div>
            </div>


            <div style={{ display: "flex", justifyContent: "center", padding: "10px", gap: "30px" }}>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(4)}>4</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(5)}>5</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(6)}>6</button>
                </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", padding: "10px", gap: "30px" }}>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(7)}>7</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(8)}>8</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(9)}>9</button>
                </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", padding: "10px", gap: "30px" }}>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarValor(0)}>0</button>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "30px", gap: "30px" }}>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => setOperador("+")}>+</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => setOperador("-")}>-</button>
                </div>
                <div>
                    <button style={{ height: "3rem", width: "3rem" }} onClick={() => asignarTotal()}>=</button>
                </div>
            </div>

        </div>
    )
}