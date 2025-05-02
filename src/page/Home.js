

export default function Home() {
    return (
        <div class="Main-Container">
            <div class="Title-Container">
                <h1 class="Main-Title">Bienvenido a la pagina de Rick and Morty!</h1>
                <p>Aqui puedes encontrar diversos episodios y a sus respectivos personajes.</p>
            </div>
            <div>
                <h2 class="Sec-Title">En esta pagina puedes:</h2>
                <div class="Multi-Container">
                    <div class="Feature-Container">
                        <h3 class="Feature">Ir a la lista de Episodios</h3>
                    </div>
                    <div class="Feature-Container">
                        <h3 class="Feature">Ver la lista de Personajes</h3>
                    </div>
                </div>
                <div class="Multi-Container">
                    <Link to="/chapters" className="btn1">
                        Lista de Episodios
                    </Link>
                    <Link to="/characters" className="btn1">
                        Lista de Personajes
                    </Link>
                </div>
            </div>
        </div>
    );
}
