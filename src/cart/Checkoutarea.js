import React,{useState} from 'react'
import './Checkoutarea.css'
import Checkout from './Checkout.js'

import { Button } from 'react-bootstrap'
function Checkoutarea(props) {
   
    
    let price = 0
    let tax = 0
    let count = 0 
   
    for(var i = 0 ; i<props.cartItem.length ;i++)
    {
        price += parseInt(props.cartItem[i].price)
        count += parseInt(props.cartItem[i].count)
    }
    tax = (price*5/100)
    const [show , setShow] = useState(false)
       
    return (

        <div className="container">
            <div className="header">Checkout Area</div>
            <div className="display_table">
                 {show ? <Checkout price = {price} tax = {tax}  setShow = {setShow}/>: null}  
                <p className="cart_count">{count}<i className="fa fa-shopping-cart"></i></p>
                <table className="table_cart">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.cartItem.map((data)=>(
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.des}</td>
                            <td>{data.count}</td>
                            <td>${data.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            
                <div className="total">
                    <h3>SubTotal :- {price}</h3>
                    <h3>Tax :- {tax}</h3>
                    <h2>Total :- {tax + price}</h2>
                </div> 
                <div className="div_show_checkout">
                    <Button className="btn_show_Checkout" variant="primary" onClick={()=>setShow(true)}> Check Out</Button>
                </div>
                
            </div>
           
        </div>

    )
}

export default Checkoutarea

















