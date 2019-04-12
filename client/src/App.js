import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/RegisterComponent';
import Login from './components/LoginComponent';
import Logout from './components/LogoutComponent'
import CreateProduct from './components/CreateProductComponent';
import BuyProduct from './components/EditProductComponent';
import ListProduct from './components/ProductListComponent';
import UserAccount from './components/UserAccountComponent';
import Admin from './components/AdminComponent';
import axios from 'axios';
import './App.css'
class App extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn : false,
      user : '',
      userType : ''
    };
    if(localStorage.getItem('login')!=''){
      var loggedInUser = localStorage.getItem('login');
      var listLink = "http://localhost:5000/api/users/account/" + localStorage.getItem('login');      
      axios.get(listLink)
      .then(response =>{
        console.log(response.data[0].accountType)
        var accountType= response.data[0].accountType;
        this.setState({
          isLoggedIn : true,
          user : loggedInUser,
          userType : response.data[0].accountType });
                
      })
      .catch(function(error){
          console.log(error);
      })
    }else{
      this.state={
        isLoggedIn : false,
        user : ''
      };
    }

    
  }
  render() {
    return (
      <Router>
        <div className='container'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light scrolling-navbar ">
            <Link to={'/'} className="navbar-brand">BlockChain</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                  <li className={this.state.isLoggedIn ? 'hidden' : 'nav-item'}>
                    <Link to={'/register'} className="nav-link">Register</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'hidden' : 'nav-item'}>
                    <Link to={'/login'} className="nav-link">Login</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/list'} className="nav-link">All Items For Sale</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/sell'} className="nav-link">Sell an Item</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/account'} className="nav-link">My Account</Link>
                  </li>
                  <li className={this.state.isLoggedIn ? this.state.userType=="admin" ? 'nav-item' : 'hidden' : 'hidden' }>
                    <Link to={'/admin'} className="nav-link">Admin </Link>
                  </li>
                  <li className={this.state.isLoggedIn ? 'nav-item' : 'hidden' }>
                    <Link to={'/logout'} className="nav-link">Logout</Link>
                  </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              
              <Route exact path='/register' component={ Register } />
              <Route exact path='/account' component={ UserAccount } />
              <Route path='/login' component={ Login } />
              <Route path='/logout' component={ Logout } />
              <Route path = "/list" component={ListProduct}></Route>
              <Route path="/edit/:id" component = {BuyProduct}></Route>
              <Route path="/sell" component = {CreateProduct}></Route>
              <Route exact path='/admin' component={ Admin } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
