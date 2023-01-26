import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainContextProvider } from "./contexts/mainContext";
import Pages from "./pages";
import Constants from "./constants";

import "./index.scss";

const router = createBrowserRouter([
    {
        path: Constants.Routes.HOME,
        element: <Pages.Home />,
    },
    {
        path: "*",
        element: <div>404 NOT FOUND</div>,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MainContextProvider>
            <RouterProvider router={router} />
        </MainContextProvider>
    </React.StrictMode>
);
