import { Link, useLocation } from 'react-router-dom';
import MyRouters from '../../router/Router';


export default function Menu() {
    const location = useLocation();
    const restringidos = ["/login"];

    const noExiste = restringidos.indexOf(location.pathname) === -1;
    return(
        <div className="App">
            {(noExiste && 
            <header className="App-header">
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/about">Acerca de</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>
                </nav>
            </header>)}
            <MyRouters />
        </div>
    )
}
