import React from "react";
import {toast, Slide} from "react-toastify"

export const ImageDescription = ({loading, error, start, imageSrc, t}) => {

    const copyImgSource = (imageSrc) => {
        try {
          navigator.clipboard.writeText(imageSrc)
          toast.success("Image source copied to clipboard", {
            style: {backgroundColor: "#555", color: "white"},
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
            });
        }
        catch (e) {
          toast.error("Couldn't copy :( try again", {
            style: {backgroundColor: "#555", color: "white"},
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
            });
        }
    } 

    return (
        <div className="image-description">
            {loading
            ? 
            null 
            : 
            (error 
            ? 
            <p className="error-description">
            {t(error)}
            </p> 
            :
            start
            ? 
            <div>
            <p 
                title={imageSrc} 
                className="image-source-description"
            >
            {t("Source: ") + imageSrc.substring(0, 100) + (imageSrc.length > 100? "..." : "")}
            </p>
            <button 
                className="fa fa-clipboard copy-image-src-btn grow"  
                onClick={() => copyImgSource(imageSrc)} >
            </button>
            </div>
            : 
            null
            )
            }
        </div>
    )
}