import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { Provider } from 'react-redux';
import store from "./store/index.js";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
    <Provider store={store}>
        <App />
    </Provider>
);
