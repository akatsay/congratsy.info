import React from "react";

export const Image = ({loading, imageSrc, t}) => {
    return (
        <div className="image-container">
            {loading 
            ? 
            <>
                <div className="lds-dual-ring"></div>
                <p className="loading-description">
                {t("Image is loading")}
                </p>
            </>
            :
            <img 
                className="image-result" 
                src ={imageSrc} 
                alt={t("Couldn't load, try again")} 
            />}
        </div>
    )
}