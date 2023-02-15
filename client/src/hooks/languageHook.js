import { useState } from "react"
import { useTranslation } from 'react-i18next'
import { toast, Slide } from "react-toastify"

export const useLanguage = () => {
  
  const [ language, setLanguage ] = useState("en")

  const { t, i18n } = useTranslation()


  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    toast.success(`language changed to ${'"' + lang.toUpperCase() + '"'}`, {
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

  return {language, setLanguage, changeLanguage, t}
}