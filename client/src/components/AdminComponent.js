import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const User = props=>(
    <tr>
        <td >{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.accountBalance}</td>
      <td className = {props.user.accountType=="admin" ? 'hidden' : props.user.accountStatus=="approved" ? 'showDelete' : 'hidden' } >
        <DeleteButton user={props.user}/>
        </td>
        <td className = {props.user.accountType=="admin" ? 'hidden' : props.user.accountStatus=="pending" ? 'showApprove' : 'hidden' } >
          <ApproveButton user={props.user}/>
          </td>
        <td className = {props.user.accountType=="admin" ? '' : 'hidden'} >
        </td>
    </tr>
)

class DeleteButton extends Component{
    constructor(props){
        super(props );
        this.state = {
            email : this.props.user.email
        }
    }

    deleteUser(e){
        var listLink = "http://localhost:5000/api/users/delete/" +  e.target.value;
        axios.get(listLink)
        .then(response =>{
           console.log("Deleted successfully");
           window.location.reload();

        })
        .catch(function(error){
            console.log(error);
        })

    };

    render() {
        return (
          <button onClick={this.deleteUser} value={this.state.email} type="button" className="btn btn-danger">
            delete
          </button>
        );
    }

}

class ApproveButton extends Component{
    constructor(props){
        super(props );
        this.state = {
            email : this.props.user.email
        }
    }
approveUser = e =>{
    axios.put("http://localhost:5000/api/users/approve/"+e.target.value)
    .then(response => {
      console.log("Approved successfully");
      window.location.reload();
    })
    .catch(error =>{
      console.log(error);
    })
}

    render() {
        return (
          <button onClick={this.approveUser} value={this.state.email} type="button" className="btn btn-success">
            Approve User
          </button>
        );
    }

}









export default class ListProduct extends Component{
    constructor(props){
        super(props);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.userList = this.userList.bind(this);

        this.state= {
            users:[],
            limit :5

        };
    }


    componentDidMount(){
        var listLink = "http://localhost:5000/api/users/list";
        axios.get(listLink)
        .then(response =>{
            this.setState({users:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }




    onLoadMore() {
        this.setState({
            limit: this.state.limit + 5
        });

    }


    userList(){
        return this.state.users.slice(0,this.state.limit).map(function(currentUser,i){
          console.log(currentUser);
            return(
              <User user={currentUser} key={i}/>
            )
        });
    }
    render(){
        return (

            <div>
            <h3>Users</h3>
            <table className= "table table-light table-striped table-hover " style={{marginTop:20}}>
            <thead className="thead-dark">
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Balance</th>
              <th scope="col">Actions</th>
                </tr>
            </thead>
                <tbody>
                    {this.userList()}
                </tbody>

            </table>
            <a href="#" onClick={this.onLoadMore}>Load</a>
            </div>

        )
    }
}
