import { createContext, useContext } from "react";
import React, { useState } from "react";

export const CatModelContext = createContext();

export const useCatModel = () => {
    const context = useContext(CatModelContext);
    if (!context) {
        console.error("Error: CatModel context not found");
        return;
    }
    return context;
};

export const CatModelProvider = ({ children }) => {
    const [catModel, setCatModel] = useState({
        ref: null,
        body: null,
        animation: "Preparado",
    });

    return (
        <CatModelContext.Provider value={{ catModel, setCatModel }}>
            {children}
        </CatModelContext.Provider>
    );
};

