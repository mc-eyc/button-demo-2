import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import gsap from "gsap";

import createStore from "./store";
import App from "./App";

gsap.globalTimeline.timeScale(1);
const store = createStore();
console.log(store.getState());
const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement,
);
