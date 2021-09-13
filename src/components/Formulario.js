import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({ addSearch }) => {
    const [inputText, addInputText] = useState("");
    const [error, addError] = useState(false);

    const handleChange = (evt) => {
        addInputText(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (inputText.trim() === "") {
            addError(true);
            return;
        }
        addError(false);
        addSearch(inputText);
        addInputText("");
    };

    return (
        <div>
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search image"
                            name="search"
                            value={inputText}
                            onChange={(evt) => handleChange(evt)}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <input
                            type="submit"
                            className="btn btn-lg btn-danger btn-block"
                            value="Search"
                        />
                    </div>
                </div>
                {error ? <Error message="Please enter your search" /> : null}
            </form>
        </div>
    );
};

export default Formulario;
