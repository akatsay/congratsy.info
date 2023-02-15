import React from "react"

import { useLanguage } from "../hooks/languageHook"

export const Header = () => {

  const {language, setLanguage, changeLanguage} = useLanguage()

    return (
      <nav className="navbar">
        <div className="brand-title">Congratsy</div>
        <div className="dropdown">
          <button className="language" >
            {language.toUpperCase()}
            <img src={ language === "en" ? 
            "https://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg" : 
            "https://catamphetamine.gitlab.io/country-flag-icons/3x2/RU.svg"}
             alt="" />
          </button>
          <div className="dropdown-menu">
            { language === "ru" ? 
            <button 
              className="language-option"
              onClick={() => {changeLanguage("en"); setLanguage("en");}}
            >
            EN
            <img 
              className="flag" 
              src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg" 
              alt=""
            />
            </button> :
            <button
              className="language-option"
              onClick={() => {changeLanguage("ru"); setLanguage("ru");}}
            >
            RU
            <img
              className="flag" 
              src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/RU.svg"
              alt=""
            />
            </button>}
          </div>
        </div>
      </nav>
    )
}