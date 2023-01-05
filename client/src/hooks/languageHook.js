import { useState } from "react"
import { useTranslation } from 'react-i18next'

export const useLanguage = () => {
  
  const [ language, setLanguage ] = useState("en")

  const { t, i18n } = useTranslation()


  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return {language, setLanguage, changeLanguage, t}
}