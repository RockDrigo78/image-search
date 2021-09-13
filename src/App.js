import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ImageList from "./components/ImageList";

function App() {
    const [search, addSearch] = useState("");
    const [imageList, addImageList] = useState([]);
    const [page, addPage] = useState(1);
    const [totalPages, addTotalPages] = useState(1);

    useEffect(() => {
        if (search === "") return;

        const apiCall = async () => {
            const imagesPerPage = 30;
            const apiKey = "23371993-ae795a033d79e18a6a77d5143";
            const searchValue = search.toLowerCase().trim().replace(" ", "+");
            const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchValue}
            &per_page=${imagesPerPage}&page=${page}`;
            const response = await fetch(url);
            const result = await response.json();
            addImageList(result.hits);

            addTotalPages(Math.ceil(result.totalHits / imagesPerPage));
            document
                .querySelector(".jumbotron")
                .scrollIntoView({ behavior: "smooth" });
        };

        apiCall();
    }, [search, page]);

    const lastPage = () => {
        const newPage = page - 1;
        if (newPage < 1) return;
        addPage(newPage);
    };

    const nextPage = () => {
        const newPage = page + 1;
        if (newPage > totalPages) return;
        addPage(newPage);
    };

    return (
        <div className="container mb-4">
            <div className="jumbotron">
                <p className="display-4 text-center mb-4">Image Finder</p>
                <Formulario addSearch={addSearch} />
            </div>
            <div className="row justify-content-center">
                <ImageList imageList={imageList} />

                {page === 1 ? null : (
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={lastPage}
                    >
                        &laquo; Last
                    </button>
                )}

                {page === totalPages ? null : (
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={nextPage}
                    >
                        Next &raquo;
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
