import React from "react";
import ProductInfoCart from "./ProductInfoCart";

export default function ProductListInCart ({cart, onDelete}){
    return(
        <div>
            { cart.map((prod) =>
                <ProductInfoCart
                    product={prod}
                    onDelete={onDelete}
                    key={prod.productID}
                />)}
        </div>
    )
}