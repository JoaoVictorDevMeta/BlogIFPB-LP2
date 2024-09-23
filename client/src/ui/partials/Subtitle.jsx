import { getRelativeTime } from '../../data/utils/dataConvert'

function Subtitle(props){
    const relativeTime = getRelativeTime(props.data)
    const relativeUpdateTime = getRelativeTime(props.atualizado)

    return(
        <>
            <div className="conteudo-subtitle mx-4">
                <p className="fs-4">{props.subtitle}</p>
            </div>
            <hr></hr>
            <div className="conteudo-card mx-4">
                <img className="card-image" src='https://fmeldorado.com.br/wp-content/uploads/2024/01/ariana-grande-060523-4-329c2a0fc59b44d09608503641788567.jpg' alt="foto de perfil" />
                <div className="card ms-3">
                    <h2 className="card-title">Por {props.autor}</h2>
                    <p className="card-text">{relativeTime} {props.data === props.atualizado ? null : `| atualizado há ${relativeUpdateTime} dias`}</p>
                </div>
            </div>
        </>
    );
}

export default Subtitle