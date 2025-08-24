import { createContext, useState, useEffect, useContext } from "react";
import { getProducts } from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState();

    useEffect(() => {
      getProducts().then(setProducts);
    }, []);

    return (
        <ProductContext.Provider
        value = {{
            products
        }}
        >
        {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }

    return context
}