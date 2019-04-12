import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardDeck } from 'reactstrap';
import { MDBRow, MDBCol,MDBIcon } from "mdbreact";
import 'mdbreact/dist/css/mdb.css' ;
import 'font-awesome/css/font-awesome.min.css';

import '../css/product.css'
const User = props => (<div >
  <h4 >
    {props.user.name}
  </h4><br/>


<div >

<h4 >
    {props.user.name} </h4><br/>

    <MDBIcon icon="envelope"  size="2x" className="indigo-text pr-3"/> {props.user.email}<br/>
    <MDBIcon icon="gift"  size="2x" className="pink-text pr-3"/> ${props.user.accountBalance}<br/>




</div>

</div>)

export default class UserAccount extends Component{


    constructor(props){
        super(props);
        this.state= {users:[]};
    }

    componentDidMount(){
        var listLink = "http://localhost:5000/api/users/account/" + localStorage.getItem('login');
        axios.get(listLink)
        .then(response =>{
            this.setState({users:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    accountDetails(){
        return this.state.users.map(function(current,i){

            return(

              <User user={current} key={i}/>

            )
        });
    }
    render(){
        return (

              <div>
                <div className="row">
                <div className="col-lg-6 col-lg-offset-3 ">
                {this.accountDetails()}
                </div>

                </div>
              </div>

        )
    }
}
