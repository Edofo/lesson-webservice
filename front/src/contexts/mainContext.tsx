import React, { createContext, useState, useContext } from "react";

interface MainContextProps {}

export const MainContext = createContext<MainContextProps | null>(null) as React.Context<MainContextProps>;

export const MainContextProvider = (props: any) => {
    const value = {};

    return <MainContext.Provider value={value}>{props.children}</MainContext.Provider>;
};

const useMainContext = () => {
    const context = useContext(MainContext);

    if (context === undefined) {
        throw new Error("useMainContext must be used within a MainContextProvider");
    }

    return context;
};

export default useMainContext;
