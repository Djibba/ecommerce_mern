import React,{ createContext, useState} from "react";
import ProductsAPI from './api/ProductsAPI';

export const GlobalState = createContext()

export const DataProvider = ({children}) => {

    ProductsAPI()

    return (
        <GlobalState.Provider value={"Value"}>
            {children}
        </GlobalState.Provider>
    )
}
