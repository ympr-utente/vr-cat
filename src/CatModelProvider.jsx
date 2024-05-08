import React, { useState } from "react";
import { CatModelContext } from "./CatModelContext";

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
