/*
import React, { useState } from 'react'
import { ipcRenderer as ipc } from 'electron'

interface Product {
    Name: string,
    ProductNumber: string
}
let productsFromDB: Product[] = []

const ProductList = () => {
    const [show, showProducts] = useState(false)

    const getProducts = () => {
        ipc.invoke('getproducts').then((products) => {
            productsFromDB = products
            showProducts(true)
        })
    }

    if (!productsFromDB.length) {
        getProducts()
    }

    return show && (
        <>
            <h1>Products:</h1>
            {
                productsFromDB.map((p, index) =>
                    <div key={index}>{p.Name} - {p.ProductNumber}</div>
                )
            }
        </>
    )
}

export default ProductList
/*
ipc.invoke('getproducts')
    .then((products) => {
        productsFromDB = products
        showProducts(true)
    })

(App.tsx)
    // Import React library
import React from 'react'
import ProductList from './componenets/ProductList'

const App = () => {
    return (
        <div>
            <p>Hello,</p>
            <p>This is a sample application to demonstrate the use of <strong><em>TediousJS within Electron/React App</em></strong></p>

            <hr />

            <ProductList />
        </div>
    )
}

// Export the main component
export default App
*/