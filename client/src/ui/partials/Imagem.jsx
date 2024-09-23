function Imagem(props) {
  return (
    <div className="conteudo-imagem px-4">
      <img
        className="imagem-inicial"
        src={props.src || "https://files.tecnoblog.net/wp-content/uploads/2022/05/blog.png"}
        alt={props.alt}
      />
      <p className="descricao">
        {props.descricao} / {props.autor} / {props.fonte}
      </p>
    </div>
  );
}

export default Imagem;
