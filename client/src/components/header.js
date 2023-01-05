import React, { useState } from "react"
import { useLanguage } from "../hooks/languageHook"

function Header() {

  const {language, setLanguage, changeLanguage} = useLanguage()
  const [disabledBtn, setDisabledBtn] = useState(true)

  const disabledBtnHandler = () => {
    setDisabledBtn(false)
  }

  const enabledBtnHandler = () => {
    setTimeout(() => {setDisabledBtn(true)}, 100)
  }

    return (
      <nav className="navbar">
        <div className="brand-title">Congratsy</div>
        <div className="dropdown">
          <button className="language" onFocus={disabledBtnHandler} onBlur={enabledBtnHandler}>{language.toUpperCase()}<img src={ language === "en" ? "https://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg" : "https://catamphetamine.gitlab.io/country-flag-icons/3x2/RU.svg"} alt="" /></button>
          <div className="dropdown-menu">
            { language === "ru" ? <button 
            disabled={disabledBtn}
            className="language-option"
            onClick={() => {changeLanguage("en"); setLanguage("en");}}>
            EN
            <img className="flag" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg" alt=""/>
            </button> :
            <button
            disabled={disabledBtn}
            className="language-option"
            onClick={() => {changeLanguage("ru"); setLanguage("ru");}}>
            RU
            <img className="flag" src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/RU.svg" alt=""/>
            </button>}
          </div>
        </div>
      </nav>
    )
}

export default Header