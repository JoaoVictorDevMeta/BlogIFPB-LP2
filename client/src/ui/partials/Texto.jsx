function Texto(props){

    return(
        <div className="conteudo-texto">
            <p className="texto fs-5" dangerouslySetInnerHTML={{__html: props.texto}}></p>
        </div>
    );
}

export default Texto