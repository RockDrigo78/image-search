import React from "react";
import Image from "./Image";

const ImageList = ({ imageList }) => {
    return (
        <div className="col-12 p-5 row">
            {imageList.map((image) => (
                <Image key={image.id} image={image} />
            ))}
        </div>
    );
};

export default ImageList;
