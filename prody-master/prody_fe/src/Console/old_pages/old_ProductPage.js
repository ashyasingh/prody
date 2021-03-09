import React, { Component } from 'react';
import Iframe from 'react-iframe'
import './ProductPage.css'

class ProductPage extends Component {

    state = {
        barcode: '',
        clicked: false
    };

    changeHandler = (event) => {
        const value = event.target.value;
        this.setState({
            barcode: value
        })
    };

    clicked = () => {
        this.setState({clicked: true})
    };

    render() {

        const iframe = () => {
            const url = "http://prody.me/p/" + this.state.barcode;
            if(this.state.clicked && this.state.barcode) {
                return (
                    <Iframe
                        url = {url}
                        width="1300px"
                        height="700px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"
                    />
                )} else {return null}
        };

        return (
        <div className="ProductPage" >
            <input className="ProductPageInput" onChange={this.changeHandler} placeholder="Enter Barcode..."/>
            <input className="ProductPageButton" type="submit" onClick={this.clicked} value="OPEN"/>
            {iframe()}
        </div>
    );
    }
}

export default ProductPage;