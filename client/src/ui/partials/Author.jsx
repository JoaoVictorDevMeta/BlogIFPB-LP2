import { getRelativeTime } from "../../data/utils/dataConvert";
import { Link } from "react-router-dom";

function Subtitle(props) {
  const relativeTime = getRelativeTime(props.data);
  const relativeUpdateTime = getRelativeTime(props.atualizado);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="author-desc mx-4">
        <p>{props.description}</p>
      </div>
      <hr></hr>
      <div className="conteudo-card ms-4">
        <img
          className="card-image"
          src="https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"
          alt="foto de perfil"
        />
        <div className="author-info ms-3">
            <Link to={`/profile/${props?.autorId}`} className="author-title">{props.autor}</Link>
            <span>{props?.autorCourse}</span>
        </div>
      </div>
      <div className="ms-4 d-flex date-show">
        <h4>{props.createDate}</h4>
        <p className="card-text fs-6">
          {relativeTime}{" "}
          {props.data === props.atualizado
            ? null
            : `| atualizado há ${relativeUpdateTime} dias`}
        </p>
      </div>
      { ( user.id === props.userId ) ? <div className="ms-4 d-flex date-show">
        <Link to={`/editblog/${props.blogId}`}>Editar...</Link>
      </div> : null }
    </>
  );
}

export default Subtitle;
