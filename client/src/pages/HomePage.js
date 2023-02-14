import React, { useCallback, useEffect, useState } from "react"
import { toast, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import { useHttp } from "../hooks/http.hook"
import { useLanguage } from "../hooks/languageHook"

import { ImageDescription } from "../components/imageDescription"
import { Image } from "../components/image"

export const HomePage = () => {

    const { loading, error, request, clearError } = useHttp()
    const {t} = useLanguage()
  
    const [start, setStart] = useState(false)
    const [imageSrc, setImageSrc] = useState(require("../images/duck.png"))
    const [urlList, setUrlList] = useState([])
    const [idCounter, setIdCounter] = useState(0)

    const [form, setForm] = useState({
      occasion: "",
      name: ""
    })
    const [prevForm, setPrevForm] = useState({
      occasion: "",
      name: ""
    })
    
    const [customOccasionClicked, setCustomOccasionClicked] = useState(false)
    const [disabledSearchButton, setDisabledSearchButton] = useState(true)

    const changeForm = (event) => {
      setForm({...form , [event.target.name]: event.target.value})
    }
    
    const checkFormIsChanged = useCallback(() => {
      if (JSON.stringify(form) === JSON.stringify({occasion: "", name: ""})) {
        setDisabledSearchButton(true)
      } else {
        setDisabledSearchButton(false)
      }
    }, [form])
    

    useEffect(() => {
      checkFormIsChanged()
    }, [checkFormIsChanged])

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
  
    const getRequestData = async () => {
      const data = await request("/api/home", "post", {...form})
      return data.imgUrl
    }

    // counter to set id for getting imageSrc from urlList every time user clicks search with unchanged query

    const countId = () => {
      if (idCounter >= (urlList.length - 1)) {
        setIdCounter(0)
      } else {
        setIdCounter(idCounter + 1)
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      clearError()
      if (JSON.stringify(form) === JSON.stringify(prevForm)) {
        countId()
        setImageSrc(urlList[idCounter])
      } else {
        const data = await getRequestData()
        setIdCounter(0)
        setUrlList([...data])
        setImageSrc(data[idCounter]) 
        setPrevForm({...form})
      }
      !start ? setStart(true) : setStart(true)
    }
  
    return (
      <>
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

                {customOccasionClicked
                ? 
                <input 
                  autoComplete="off" 
                  className="input occasion" 
                  type="text" 
                  name="occasion" 
                  placeholder={t("Input your occasion")} 
                  onChange={changeForm} 
                /> 
                :
                null
                }

                <input 
                  autoComplete="off" 
                  className="input name" 
                  type="text" 
                  name="name" 
                  placeholder={t("What is your friend's name?")} 
                  onChange={changeForm} 
                />

                <button
                  type="submit"
                  className="find-button"
                  title={disabledSearchButton ? t("Choose occasion or input name") : null}
                  disabled={disabledSearchButton} 
                  onClick={handleSubmit}>
                  {t("Find Image")}
                  </button>

              </form>
            </div>
          <Image loading={loading} error={error} start={start} imageSrc={imageSrc} t={t} />
        </div>
        <ImageDescription loading={loading} error={error} start={start} imageSrc={imageSrc} t={t} />
      </>
    );
  }
