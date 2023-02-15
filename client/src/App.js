import React from "react"
import { ToastContainer } from "react-toastify"

import {Header} from "./components/header"
import {HomePage} from "./pages/HomePage"
import { Footer } from "./components/footer"

function App() {
  return (
    <div className ="container">
      <Header />
      <HomePage />
      <Footer />
      <ToastContainer
        limit={3}
        newestOnTop={false}
        rtl={false}
      />
    </div>
  )
}

export default App;
