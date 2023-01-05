import React, { useEffect, useState } from "react"
import { ToastContainer, toast, Slide } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useHttp } from "../hooks/http.hook"
import { useLanguage } from "../hooks/languageHook"

import Header from "../components/header"

function imageToBlob(imageSrc) {
  const img = new Image()
  const c = document.createElement("canvas")
  const ctx = c.getContext("2d")
  img.crossOrigin = ""
  img.src = imageSrc
  return new Promise((resolve,) => {
    img.onload = function () {
      c.width = this.naturalWidth;
      c.height = this.naturalHeight
      ctx.drawImage(this, 0, 0)
      c.toBlob((blob) => {
        // here the image is a blob
        resolve(blob)
      }, "image/png", 0.75)
    }
  })
}

function HomePage() {

    const { loading, error, request, clearError } = useHttp()
    const {t} = useLanguage()
  
    const [start, setStart] = useState(false)
    const [imageSrc, setImageSrc] = useState(require("../images/duck.png"))
    const [form, setForm] = useState({})
    const [prevForm, setPrevForm] = useState({})
    const [urlList, setUrlList] = useState([])
    const [customOccasionClicked, setCustomOccasionClicked] = useState(false)

    async function copyToClipboard(imageSrc){
      const blob = await imageToBlob(imageSrc)
      const item = new ClipboardItem({ "image/png": blob });
      
      try {
        navigator.clipboard.write([item]);
        console.log("image copied")
        toast.success(t("Image copied to clipboard"), {
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
      } catch (e) {
        console.log("Copy failed" + e)
      }
    }
  
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
  
    const changeForm = (event) => {
      setForm({...form , [event.target.name]: event.target.value})
    }
  
    // const handleClick = async (event) => {
    //   event.preventDefault()
    //   clearError()
    //   const data = await request("/api/home", "post", {...form})
    //   setImageSrc(data.imgUrl) 
    //   !start ? setStart(true) : setStart(true)
    // }

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

    const copyImg = () => {
      copyToClipboard(imageSrc)
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
                      value={t("Happy Holidays")}
                      onChange={changeForm} 
                      onClick={() => {setCustomOccasionClicked(false)}}
                      />
                    <label htmlFor="4">
                      {t("Holidays")}
                    </label>
                      <input 
                      type="radio"
                      className="radio-button"
                      id="5"
                      name="occasion"
                      value=""
                      onChange={changeForm}
                      onClick={() => {setCustomOccasionClicked(true)}}
                      />
                    <label htmlFor="5">
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
                <button type="submit" className="find-button" onClick={handleClick}>{t("Find Image")}</button>
              </form>
            </div>
              <div className="image-container">
                {loading ? <>
                    <div className="lds-dual-ring"></div><p className="loading-description">{t("Image is loading")}</p>
                  </> :
                <div className="image-wrapper tooltip">
                  <img onClick={copyImg} className="image-result" src ={imageSrc} alt={t("Couldn't load, try again")} />
                  <span className="tooltiptext">
                  <p className="tooltip-description">{t("Click to copy image")}</p>
                  </span>
                </div>}
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
