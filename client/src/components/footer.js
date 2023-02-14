import React from "react"

import "../styles/footer.css"

export const Footer = () => {

    return (
        <>
            <div className="footer">
                <div className="author">Created by Catsay <p className="smile">🙃</p></div>
                <i 
                    className="fa-brands fa-github grow" 
                    onClick={() => {
                        window.open('https://github.com/akatsay/congratsy.info', '_blank');
                    }}
                >
                </i>
                <p className="pustishka">Created by Catsay 🙃</p>
            </div>
        </>
    )
}