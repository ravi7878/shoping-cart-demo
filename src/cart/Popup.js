import React from 'react';
import './Popup.css'
import {  Button } from 'react-bootstrap'


class Popup extends React.Component {
   
    constructor(props)
    {
        super(props)
        this.state={
            id : this.props.id,
            data : this.props.data,
            cart : this.props.cart,
            count : 0,
         }
        
        this.inputRef = React.createRef()

        this.showPrev = this.showPrev.bind(this)
        this.showNext = this.showNext.bind(this)
        this.handleCart = this.handleCart.bind(this)
        this.handleCount = this.handleCount.bind(this)
    }
    handleCount = (e) =>
    {
        this.setState({
            count : e.target.value
        })
        
     }
    handleCart = () =>
    {   
        if(this.state.count===0)
        {
            this.inputRef.current.focus()
        }
        else
        {
            this.props.handleCart(this.state.id,this.state.count)
        }
    }

    showNext = ()=>
    {
        
        if(this.state.data.length === this.state.id + 1)
        {
            this.setState({
                id : this.state.id = 0
            })
        }
        else{
            this.setState({
                id : this.state.id +1
            })
        }
    }
    showPrev = ()=>
    {
            if(this.state.id !== 0 )
            {
                this.setState({
                    id:this.state.id - 1
                })
            }
    }
    render() {
        return (
            <div className='popup'>
                <div className="container">
                <button className="btnClose" onClick={this.props.closePopup}> X </button>
                    <div className="product_image">
                        <img  alt={this.state.data[this.state.id].img } src={this.state.data[this.state.id].img}></img>
                    </div>
                    <div className="value">
                        <p id="name">Name:- {this.state.data[this.state.id].name}</p>
                        <p id="desc">Desc :- {this.state.data[this.state.id].desc}</p>
                        <p id="cat">catagory :- {this.state.data[this.state.id].catagory}</p>
                        <p id="price">Price :- ${this.state.data[this.state.id].price}</p>
                        <div className="add_cart_div">
                            
                            <input className="cart_inp" ref={this.inputRef} type="text" value={this.state.count} onChange={this.handleCount}></input>
                           
                            <Button 
                                className="add"  
                                variant="primary"
                                 onClick = {this.handleCart}
                                >Add To Cart</Button>
                        </div>
                        
                    </div>
                </div>
                <div className="btn_div">
                    <button className="btnNextPrev" disabled={this.state.btndis} onClick={() => { this.showPrev()}}> Prev</button>
                    <button className="btnNextPrev" onClick={() => { this.showNext()}}> Next</button>
                </div>

            </div>
        );
    }
}

export default Popup;