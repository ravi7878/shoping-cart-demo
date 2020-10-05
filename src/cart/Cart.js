import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import Popup from './Popup'
import Rightcart from './Rigthcart.js'
import './Cart.css'

import Checkoutarea from './Checkoutarea.js'

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            Item: [],
            Cart: [],
            totalItem: 0,
            showComponent: false,
            showPayment: false,
            showId: '',

            expand: true,
            height: "",
            width: ""

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleOnImageClick = this.handleOnImageClick.bind(this)
        this.handleClearCart = this.handleClearCart.bind(this)

        this.handleIncrement = this.handleIncrement.bind(this)
        this.handleDecrement = this.handleDecrement.bind(this)
        this.handleDelete = this.handleDelete.bind(this)


    }
    // show pop-up
    handleOnImageClick = (id) => {
        this.setState({
            showComponent: !this.state.showComponent,
            showId: id
        })
    }
    handleClearCart = () => {
        this.setState({
            Cart: [],
            showPayment: false
        })
    }

    handleDelete = (e) => {
        const name = e.target.value
        console.log(name)

        const itemIndex = this.state.Cart.findIndex(item => item.name === name)
        console.log(itemIndex)

        let allItem = [...this.state.Cart]
        allItem.splice(itemIndex, 1)

        this.setState({
            Cart: allItem
        })
    }

    handleIncrement = (e) => {

        const name = e.target.value
        
        const itemIndex = this.state.Cart.findIndex(item => item.name === name)
        const itemId = this.state.Item.findIndex(item => item.name === name)
        let allItem = [...this.state.Cart]

        allItem[itemIndex] = {
            ...allItem[itemIndex], "count": allItem[itemIndex].count + 1,
            "price": parseInt(allItem[itemIndex].price) + parseInt(this.state.Item[itemId].price)
        }

        this.setState({
            Cart: allItem
        })

    }
    handleDecrement = (e) => {

        const name = e.target.value

        const itemIndex = this.state.Cart.findIndex(item => item.name === name)
        const itemId = this.state.Item.findIndex(item => item.name === name)

        let allItem = [...this.state.Cart]

        if (allItem[itemIndex].count - 1 > 0) {
            allItem[itemIndex] = {
                ...allItem[itemIndex], "count": allItem[itemIndex].count - 1,
                "price": parseInt(allItem[itemIndex].price) - parseInt(this.state.Item[itemId].price)
            }
            this.setState({
                Cart: allItem
            })

        }
        else {
            allItem.splice(itemIndex, 1)
            this.setState({
                Cart: allItem
            })
        }

    }


    //add items to cart
    handleClick = (id, icount) => {
        let arrayMatch = false
        let count = parseInt(icount)

        // console.log("id" , id)
        // console.log("count",icount)

        this.setState({
            showPayment: true
        })


        for (var i = 0; i < this.state.Cart.length; i++) {
            let ele = this.state.Cart[i]
            if (ele.name === this.state.Item[id].name) {
                arrayMatch = true;
                if (count > 0) {
                    ele.count = ele.count + parseInt(count)
                    ele.price = this.state.Item[id].price * ele.count
                }
                else {
                    ele.count = ele.count + 1
                    ele.price = this.state.Item[id].price * ele.count
                }
                break;
            }

        }
        if (!arrayMatch && count > 1) {

            let cartItem = {
                "id": id,
                "image": this.state.Item[id].img,
                "name": this.state.Item[id].name,
                "des": this.state.Item[id].desc,
                "price": parseInt(this.state.Item[id].price) * count,
                "count": count
            }
            this.state.Cart.push(cartItem)
            console.log("Item Add In Cart ", this.state.Cart)
        }
        else if (!arrayMatch) {
            let cartItem = {
                "id": id,
                "image": this.state.Item[id].img,
                "name": this.state.Item[id].name,
                "des": this.state.Item[id].desc,
                "price": parseInt(this.state.Item[id].price),
                "count": 1
            }
            this.state.Cart.push(cartItem)
            // console.log("Item Add In Cart ", this.state.Cart)

        }
        else {
            console.log("Update Count of Item", this.state.Cart)
        }
    }

    // fetch data from json file
    componentDidMount() {

        fetch('./Data.json')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    Item: data.items
                })
            },
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
    }



    render() {
        const { error, isLoaded, Item, Cart } = this.state

        if (error) {
            return <div className="Title"><h3>PRODUCTS</h3></div>
        }
        else if (!isLoaded) {
            return <div className="Title"><h3>Loading</h3></div>
        }
        else {
            return (
                <>

                    <div>
                        <div className="Title"><h3>PRODUCTS</h3></div>
                        {this.state.showComponent ? <Popup data={this.state.Item}
                            id={this.state.showId}
                            closePopup={this.handleOnImageClick}
                            handleCart={this.handleClick}

                        /> : null}

                        <div className="Cart_items">
                            {Item.map((data) => (
                                <Card className="card" key={data.id}>
                                    <div className="image_container">
                                        <Card.Img className="Image" src={data.img} onClick={() => { this.handleOnImageClick(data.id - 1) }} />
                                        <div className="overlay" src={data.img} onClick={() => { this.handleOnImageClick(data.id - 1) }}>
                                            <a href="#" className="icon" title="User Profile">
                                                <i className="fa fa-search"></i>
                                            </a>
                                        </div>
                                    </div>
                                     <Card.Body className="Card_body">
                                        <Card.Title >{data.name}</Card.Title>
                                        <Card.Text>{data.desc}</Card.Text>
                                        <Card.Text>${data.price}</Card.Text>
                                        <Button className="btn_add" variant="primary" onClick={() => { this.handleClick(data.id - 1) }}>Add To Cart</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                      

                        <Rightcart

                            cartItem={Cart}
                            clearCart={this.handleClearCart}

                            deleteFromCart={this.handleDelete}
                            increment={this.handleIncrement}
                            decrement={this.handleDecrement}

                        />

                        {this.state.showPayment ? <Checkoutarea cartItem={Cart} /> : null}

                    </div>
                </>
            )
        }
    }
}

