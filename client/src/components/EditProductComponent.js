import React, {Component} from 'react';
import axios from 'axios';
import '../App.css'
import AlertModal from './AlertModalComponent';
export default class BuyProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductPostedBy = this.onChangeProductPostedBy.bind(this);
        this.onChangeProductStatus = this.onChangeProductStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            product_price: '',
            product_posted_by: '',
            product_status: 'Avail',
            showModal : false,
            showAlertModal : false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/products/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_name: response.data.product_name,
                    product_price: response.data.product_price,
                    product_posted_by: response.data.product_posted_by,
                    product_status: response.data.product_status
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductPostedBy(e) {
        this.setState({
            product_posted_by: e.target.value
        });
    }

    onChangeProductStatus(e) {
        this.setState({
            product_status: e.target.value
        });
    }

    onSubmit(e) {
      this.setState({
          showModal: false
      });
        e.preventDefault();
        var loggedInUser = localStorage.getItem('login');
        var id = localStorage.getItem('id');
        const obj = {
            product_name: this.state.product_name,
            product_price: this.state.product_price,
            old_owner : this.state.product_posted_by,
            new_owner : loggedInUser,
            product_status: this.state.product_status,
            new_owner_id : id
        };
        axios.post('http://localhost:5000/api/products/buy/'+this.props.match.params.id, obj)
            .then(res => {
              console.log(res.data);
              this.setState({
                  showAlertModal: true
              });
            })
            .catch(error => {
              this.setState({
                  showModal: true
              });
            });

    }
    alertClose = e =>{
      this.setState({showAlertModal : false});
      this.props.history.push('/');
      window.location.reload();
    }

    render() {
        return (
            <div>
                <h3>Product Details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_name}
                                onChange={this.onChangeProductName}
                                readonly=""/>
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_price}
                                onChange={this.onChangeProductPrice}
                                readonly=""/>
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_status}
                                onChange={this.onChangeProductStatus}
                                readonly=""/>
                    </div>
                    <div className="form-group">
                        <label>Posted By: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_posted_by}
                                onChange={this.onChangeProductPostedBy}
                                readonly=""/>
                    </div>
                        <div className="form-group">
                            <input type="submit" value="Buy Product" className="btn btn-primary" disabled={this.state.product_status=='sold'}/>
                        </div>

                </form>
                <div className={this.state.showModal ? 'alert alert-danger' : 'hidden' } role="alert">
                    Insufficient Balance
                </div>
                <AlertModal
                    show = {this.state.showAlertModal}
                    close = {this.alertClose}
                    heading = "Success"
                    body = "Product has been bought successfully. Go to your account page to view it"
                    text = "Close"/>
            </div>
        )
    }
}
