
function Autor(props){

    return(
        <section className="autor-xxl container-xxl p-4 px-2">
            <img className="autor-image" src='https://fmeldorado.com.br/wp-content/uploads/2024/01/ariana-grande-060523-4-329c2a0fc59b44d09608503641788567.jpg' alt="foto de perfil" />
            <div className="autor">
                <h1 className="autor-title">{props.autor}</h1>
                <p className="autor-descricao">{props.tipo} | {props.area} </p>
                <p className="autor-text">{props.texto}</p>
            </div>
        </section>
    );
}

export default Autor