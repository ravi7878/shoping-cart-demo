import React, { Component } from 'react'
import './Checkout.css'
export default class Checkout extends Component
{
    constructor(props)
    {
        super(props)
        this.state ={
            total : this.props.price,
            tax : this.props.tax,
            
        }
        
    }
    render()
    {
        return(
            <div className="checkout_container">
               
                <div className="bill">
                <button className="btn_close" onClick={()=>this.props.setShow(false)}> X </button>
                    <p id="header">Checkout</p>
                    <p id="description">We accept <i className="fa fa-cc-visa"/> <i className="fa fa-cc-mastercard"/> <i className="fa fa-cc-amex"/></p>
                    <p id="sub_total">Subtotal :- ${this.state.total} </p>
                    <p id="tax">Tax :- ${this.state.tax} </p>
                    <p id="total">Total :- ${this.state.tax + this.state.total} </p>
                    <p id="description">This is where our payment processor goes</p>
                </div>
               

            </div>
        )
    }
}