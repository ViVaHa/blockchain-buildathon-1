import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardDeck } from 'reactstrap';
import '../css/product.css'
const Product = props=>(


<div className="col-sm-3 pad">
    <Card>
      <CardImg top height= "150vh"   object-fit= "cover"  src={require(`../uploads/${props.product.product_image_url}`)} alt="Card image cap" />
      <CardBody>
        <CardTitle> Product Name : {props.product.product_name}</CardTitle>
        <CardSubtitle>Price : {'$' + props.product.product_price}</CardSubtitle>
        <CardText> Availability : {props.product.product_status}</CardText>
        <center><Button color="link" disabled={props.product.product_status=='sold'}><Link to={"/edit/" + props.product._id}>Buy Product</Link></Button></center>
      </CardBody>
    </Card>
</div>




)


export default class ListProduct extends Component{


    constructor(props){
        super(props);
        this.state= {products:[]};
    }

    componentDidMount(){
        var listLink = "http://localhost:5000/api/products/list/" + localStorage.getItem('login');
        axios.get(listLink)
        .then(response =>{
            this.setState({products:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    productList(){
        return this.state.products.map(function(currentProduct,i){

            return(

              <Product product={currentProduct} key={i}/>

            )
        });
    }
    render(){
        return (

              <CardDeck>
                <div className="row">
                  {this.productList()}
                </div>
              </CardDeck>

        )
    }
}
