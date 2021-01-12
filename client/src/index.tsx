import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import ZXC from "./components/ZXC"
import "./styles/vars.css"
import "./styles/common.css"

ReactDOM.render( <BrowserRouter><ZXC /></BrowserRouter>, document.getElementById( "root" ) )