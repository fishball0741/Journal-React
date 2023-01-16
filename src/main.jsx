import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import "./index.css"
import { BrowserRouter} from "react-router-dom"


// need to import DOM, also need to tell what actual dom we want to render
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
