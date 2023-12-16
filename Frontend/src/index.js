import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { SearchContextProvider } from "./context/SearchContext.js";
import { AuthContextProvider } from "./context/AuthContext.js";

ReactDOM.render(
<AuthContextProvider>
<SearchContextProvider><App/></SearchContextProvider> 
</AuthContextProvider>
,document.getElementById("root"));
