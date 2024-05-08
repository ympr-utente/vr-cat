import { createContext, useContext } from "react";

export const CatModelContext = createContext();

export const useCatModel = () => {
    const context = useContext(CatModelContext);
    if (!context) {
        console.error("Error: CatModel context not found");
        return;
    }
    return context;
};


