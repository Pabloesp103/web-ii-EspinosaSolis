import { Link, useLocation } from 'react-router-dom';
import MyRouters from '../../router/Router';


export default function Menu() {
    const location = useLocation();
    const restringidos = ["/login"];

    const noExiste = restringidos.indexOf(location.pathname) === -1;
    return(
        <div>
            {(noExiste && 
            <header style={{ backgroundColor: "#ebf8f2", padding: "1rem 2rem" }}>
                <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <ul style={{ listStyle: "none", display: "flex", gap: "2rem", margin: "0" }}>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/chapters">Chapters</Link></li>
                        <li><Link to="/characters">Characters</Link></li>
                    </ul>
                </nav>
            </header>)}
            <MyRouters />
        </div>
    )
}