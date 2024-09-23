import { useState, useEffect } from "react";
import BlogResult from "../../ui/components/BlogResult";
import { IoMdSearch } from "react-icons/io";
import "./Search.css";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(6);

  useEffect(() => {
    fetch(`http://localhost:3000/blog/all`)
      .then((response) => response.json())
      .then((data) => setResults(data));
    fetch(`http://localhost:3000/category/all`)
      .then((response) => response.json())
      .then((data) => {
        setFilters(data);
        setLoading(false);
      });
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterResults = () => {
    let newResults = results;
    if (filter) {
      newResults = newResults.filter(
        (result) => result.category.name === filter
      );
    }
    if (search) {
      newResults = newResults.filter(
        (result) =>
          result.title.includes(search) || result.subTitle.includes(search)
      );
    }
    paginate(1);
    setFilteredResults(newResults);
  };

  useEffect(() => {
    filterResults();
  }, [filter, search, results]);

  //console.log(filter);

  const handleSetFilter = (newFilter) => {
    if (newFilter === filter) return setFilter("");
    setFilter(newFilter);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;
    setSearch(searchTerm);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  return (
    <div>
      <div className="container-xxl search-container mb-5 py-4 px-5 mt-5">
        <form className="d-flex flex-wrap gap-5" onSubmit={handleSearchSubmit}>
          <label htmlFor="search" className="fs-1 position-absolute">
            <IoMdSearch color="white" className="mb-3" />
          </label>
          <input
            type="text"
            id="search"
            className="search-input nav-bar-input"
          />
          <button className="btn btn-white button-outline fs-4">Buscar</button>
        </form>
        <p className="fs-5 pt-4" style={{ color: "white" }}>
          Buscando Resultados para: <span></span>
        </p>
      </div>

      <section className="result-container container-xxl bg-white p-5 mb-5 position-relative">
        {loading ? (
          <h1>Carregando...</h1>
        ) : (
          <>
            <div className="filter-container mb-5">
              <h1>Filtros</h1>
              <ul className="">
                {filters.map((filter, i) => {
                  return (
                    <li
                      key={i}
                      className="pb-1 mb-4"
                      onClick={() => {
                        handleSetFilter(filter.name);
                      }}
                    >
                      <p href="" className="fs-4">
                        {filter.name}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="items-container">
              <h1 className="pb-5">Resultados:</h1>
              {currentResults?.map((data, i) => {
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

            <nav className="py-5">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    className="page-link fs-5"
                    href="#"
                  >
                    Previous
                  </a>
                </li>
                {[
                  ...Array(
                    Math.ceil(filteredResults.length / resultsPerPage)
                  ).keys(),
                ].map((number) => (
                  <li
                    key={number + 1}
                    className={`page-item ${
                      currentPage === number + 1 ? "active" : ""
                    }`}
                  >
                    <a
                      onClick={() => paginate(number + 1)}
                      className="page-link fs-5"
                      href="#"
                    >
                      {number + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage ===
                    Math.ceil(filteredResults.length / resultsPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <a
                    onClick={() =>
                      currentPage <
                        Math.ceil(filteredResults.length / resultsPerPage) &&
                      paginate(currentPage + 1)
                    }
                    className="page-link fs-5"
                    href="#"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </section>
    </div>
  );
};

export default Search;
