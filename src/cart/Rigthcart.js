import React, { useState } from 'react'
import './Rigthcart.css'
import { Button } from 'react-bootstrap'
import Checkout from './Checkout.js'

// expand cart 

function Rightcart(props) {
    let count = 0
    let price = 0
    let tax = 0
    
    const [show, setShow] = useState(false)
    const [cartShow , setCartShow] = useState("none")
    const [width , setWidth] = useState("60px")

    for (let i = 0; i < props.cartItem.length; i++) {
        count += parseInt(props.cartItem[i].count)
        price += parseInt(props.cartItem[i].price)
    }
    tax = (price * 5 / 100)
    
    function expandHandler() {
        
        if(cartShow === "")
        {
            setCartShow("none")
            setWidth("60px")
        }
        else{
            setCartShow("")
            setWidth("400px")
        }
        
    }
    
    function clearCart(){
        props.clearCart()
        setCartShow("none")
        setWidth("60px")
    }
   
    return (
        <>
            {show ? <Checkout price={price} tax={tax} setShow={setShow} /> : null}

            <div className="cart_main" style={{width:width}}>
                
                <div className="count_cart" onClick={expandHandler}>
                    <div className="cart"   >
                        {count} <i className="fa fa-shopping-cart"></i>
                    </div>
                </div>

                <div className="cart_table" style={{display:cartShow}}>
                    <table className="table">
                        <tbody>
                            {props.cartItem.map((data) => (
                                // <tr></tr>
                                <tr key={data.id}>
                                    <td id="image_cart">
                                        <div className="inner_image_div">
                                        
                                        <img src={data.image} alt={data.name}/>
                                        <button className="del" value={data.name} onClick={props.deleteFromCart}>
                                        <i class="fa fa-times"></i>
                                        </button> 
                                        
                                        </div>
                                    </td>
                                    <td id="count"> 
                                        <div className="counter">
                                        <Button className="dec" variant="primary" value={data.name } onClick={props.decrement}>-</Button>
                                        <span>{data.count}</span>
                                        <Button className="inc" variant="primary"  value={data.name } onClick={props.increment} >+</Button>
                                         </div>
                                    </td>
                                    <td id="name">{data.name}</td>
                                    <td id="price" >$ {data.price}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                
                <div className="price" style={{display:cartShow}} >
                    <p>${price}</p>
                </div>
                <div className="button" style={{display:cartShow}}>
                    <Button className="btn_show_Checkout" variant="primary" onClick={clearCart}> Clear-Cart</Button>
                    <Button className="btn_show_Checkout" variant="primary" onClick={() => setShow(true)}> Check Out</Button>
                </div>
            </div>


        </>
    )
}

export default Rightcart