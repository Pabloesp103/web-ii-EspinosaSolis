import { useState } from 'react';
import '../style/login.css'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setUser(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

       const data = {
        username: user,
        password: password,
        expiresInMins:60
       }

       fetLogIn(data, navigate);
    }

    return (
        <div className='background'>
            <div>
                <div className="containerLogin">
                    <h3>Login</h3>
                    <form className="formLogin" onSubmit={handleSubmit}>
                        <div>
                            <input onChange={handleUserChange} className="login-input" type="text" name="user" placeholder="User" />
                        </div>
                        <div>
                            <input onChange={handlePasswordChange} className="login-input" type="password" name="password" value="" placeholder="Password" />
                        </div>
                        <div className="login-button-container">
                            <button className="login-button" type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


function fetLogIn(data, navigate) {
    fetch("https://dummyjson.com/auth/login", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(response => {
        const hasNoToken = response?.accesToken === undefined

        if (hasNoToken) {
            alert("Usuario o contraseña incorrectos");
            return;
        }

        localStorage.setItem("token", response.accesToken)
        navigate("/products")

    })
    .catch(error => {
        console.error(", ~ fetLogIn ~ error:", error)
    })
}