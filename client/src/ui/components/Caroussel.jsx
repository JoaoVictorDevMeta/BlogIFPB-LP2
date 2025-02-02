import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Caroussel = (data) => {
    const [imageIndex, setImageIndex] = useState(0);

    const showPrevImage = () => {
        setImageIndex((prev) => {
            if (prev === 0) {
                return data.blogs.length - 1;
            }
            return prev - 1;
        });
    };

    const showNextImage = () => {
        setImageIndex((prev) => {
            if (prev === data.blogs.length - 1) {
                return 0;
            }
            return prev + 1;
        });
    };

    return (
        <div className="caroussel">
            <div className="c-inner">
                {data.blogs.map((blog, index) => (
                    <div
                        key={index}
                        className="c-slide"
                        style={{
                            transform: `translateX(${-100 * imageIndex}%)`,
                        }}
                    >
                        <img src={blog.image_url} alt="" />
                        <div className="c-info">
                            <h3><Link to={`/blog/${blog.id}`}>{blog.title}</Link></h3>
                            <p>
                                {blog.subTitle}
                            </p>
                            <Link to={`/blog/${blog.id}`} className="read-btn">Fazer Leitura</Link>
                            
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={showPrevImage} className="img-slider-btn">
                {" "}
                <IoIosArrowBack />
            </button>
            <button onClick={showNextImage} className="img-slider-btn" style={{ right: 0 }}>
                <IoIosArrowForward />
            </button>
            <div className="img-slide-select">
                {data.blogs.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setImageIndex(index)}
                        className={index === imageIndex ? "active" : ""}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Caroussel;
