import "./Home.css";
import useBlogs from "../../data/hooks/home/useBlogs";

import Caroussel from "../../ui/components/Caroussel";
import Loading from "../../ui/components/Loading";
import BlogResult from "../../ui/components/BlogResult";

const Home = () => {
    const { blogs, loading } = useBlogs();
    const carrouselBlogs = blogs.slice(0, 4);
    const recentBlogs = blogs.slice(-4).reverse();

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="caroussel-initial">
                <Caroussel blogs={carrouselBlogs} />
            </div>
            <div className="d-flex justify-content-center py-5">
                <div className="blogs-container py-3">
                    <div className="recent-blogs">
                        <h2>Blogs Recentes</h2>
                        <div>
                            {recentBlogs?.map((data, i) => {
                                return (
                                    <BlogResult
                                        key={i}
                                        title={data.title}
                                        description={data.subTitle}
                                        image={data.image_url}
                                        category={data.category.name}
                                        link={data.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="events-container"></div>
                </div>
            </div>
        </>
    );
};

export default Home;
