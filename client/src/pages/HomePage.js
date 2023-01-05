import React, { useEffect, useState } from "react"
import { ToastContainer, toast, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useHttp } from "../hooks/http.hook"
import { useLanguage } from "../hooks/languageHook"

import Header from "../components/header"

function HomePage() {

    const { loading, error, request, clearError } = useHttp()
    const {t} = useLanguage()
  
    const [start, setStart] = useState(false)
    const [imageSrc, setImageSrc] = useState(require("../images/duck.png"))
    const [form, setForm] = useState({})
    const [prevForm, setPrevForm] = useState({})
    const [urlList, setUrlList] = useState([])
    const [customOccasionClicked, setCustomOccasionClicked] = useState(false)
    const [disabledSearchButton, setDisabledSearchButton] = useState(true)
  
    useEffect(() => {
      if (error) {
      setImageSrc(require("../images/error.png"))
      }
      toast.error(error, {
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
    }, [error])

    useEffect(() => {
      const checkFormIsChanged = () => {
        if (JSON.stringify(form) === JSON.stringify({})) {
          setDisabledSearchButton(true)
        } else {
          setDisabledSearchButton(false)
        }
      }
      checkFormIsChanged()
    }, [form])
  
    const changeForm = (event) => {
      setForm({...form , [event.target.name]: event.target.value})
    }

    const getRequestData = async () => {
      const data = await request("/api/home", "post", {...form})
      return data.imgUrl
    }

    const handleClick = async (event) => {
      event.preventDefault()
      clearError()
      if (JSON.stringify(form) === JSON.stringify(prevForm)) {
        setImageSrc(urlList[Math.floor(Math.random() * urlList.length)])
      } else {
        const data = await getRequestData()
        setUrlList([...data])
        setImageSrc(data[Math.floor(Math.random() * data.length)]) 
        setPrevForm({...form})
      }
      !start ? setStart(true) : setStart(true)
    }
  
    return (
      <>
        <Header />
          <div className ="content-container">
          <h1 className="content-title">{t("Congratulate your friend")}</h1>
            <div className="form-container"> 
              <form className="content-form">
                <div className="radio-container">
                  <h3 className="radio-title">{t("Choose the occasion")}</h3>
                  <div className="radio-container-items">
                      <input 
                      type="radio"
                      className="radio-button"
                      id="1" 
                      name="occasion"
                      value={t("Happy Birthday")}
                      onChange={changeForm}
                      onClick={() => {setCustomOccasionClicked(false)}}
                      />
                    <label htmlFor="1">
                      {t("Birthday")}
                    </label>
                      <input 
                      type="radio"
                      className="radio-button" 
                      id="2"
                      name="occasion"
                      value={t("Merry Christmas")}
                      onChange={changeForm}
                      onClick={() => {setCustomOccasionClicked(false)}}
                      />
                    <label htmlFor="2">
                      {t("Christmas")}
                    </label>
                      <input 
                      type="radio"
                      className="radio-button" 
                      id="3"
                      name="occasion"
                      value={t("Happy New Year")}
                      onChange={changeForm}
                      onClick={() => {setCustomOccasionClicked(false)}}
                      />
                    <label htmlFor="3">
                      {t("New Year")}
                    </label>
                      <input 
                      type="radio"
                      className="radio-button"
                      id="4"
                      name="occasion"
                      value={t("Good Morning")}
                      onChange={changeForm} 
                      onClick={() => {setCustomOccasionClicked(false)}}
                      />
                    <label htmlFor="4">
                      {t("Good Morning")}
                    </label>
                    <input 
                      type="radio"
                      className="radio-button"
                      id="5"
                      name="occasion"
                      value={t("Good Night")}
                      onChange={changeForm} 
                      onClick={() => {setCustomOccasionClicked(false)}}
                      />
                    <label htmlFor="5">
                      {t("Good Night")}
                    </label>
                      <input 
                      type="radio"
                      className="radio-button"
                      id="6"
                      name="occasion"
                      value=""
                      onChange={changeForm}
                      onClick={() => {setCustomOccasionClicked(true)}}
                      />
                    <label htmlFor="6">
                      {t("Custom")}
                    </label>
                  </div>
                </div>
                {customOccasionClicked ? 
                <input 
                  autoComplete="off" 
                  className="input occasion" 
                  type="text" name="occasion" 
                  placeholder={t("Input your occasion")} 
                  onChange={changeForm} 
                /> :
                  null
                }
                <input 
                  autoComplete="off" 
                  className="input name" 
                  type="text" name="name" 
                  placeholder={t("What is your friend's name?")} 
                  onChange={changeForm} 
                />
                <button
                  type="submit"
                  className="find-button"
                  title={disabledSearchButton ? t("Choose occasion or input name") : null}
                  disabled={disabledSearchButton} 
                  onClick={handleClick}>
                    {t("Find Image")}
                  </button>
              </form>
            </div>
              <div className="image-container">
                {loading ? <>
                    <div className="lds-dual-ring"></div><p className="loading-description">{t("Image is loading")}</p>
                  </> :
                  <img className="image-result" src ={imageSrc} alt={t("Couldn't load, try again")} />}
              </div>
            </div>
            <div className="image-description">
                {loading ? null : (error ? 
                  <p className="error-description">{t(error)}</p> :
                start ? 
                  <p className="image-source-description">{t("Source: ") + imageSrc.substring(0, 100)}</p> : 
                  null
                  )
                }
            </div>
          <ToastContainer
            limit={3}
            newestOnTop={false}
            rtl={false}
           />
        </>
    );
  }

  export default HomePage;
