import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

// default settings that will be used application-wise
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";

axios.interceptors.request.use(
  (request) => {
    console.log(request);
    // need to return the request config so the flow can continue
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    // need to return the request config so the flow can continue
    return response;
  },
  // invalid url error 404 will be intercepted here
  (error) => {
    console.log(error);
    // so that components can catch the error and handle it locally
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
