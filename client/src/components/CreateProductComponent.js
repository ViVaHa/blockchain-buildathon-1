import React, {Component} from 'react'
import axios from 'axios';
import PromptModal from './PromptModalComponent';
import AlertModal from './AlertModalComponent';
export default class CreateProduct  extends Component{

    constructor(props){
        super(props);
        var owner = localStorage.getItem('login');
        var owner_id = localStorage.getItem('id');
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductPostedBy = this.onChangeProductPostedBy.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            product_name:'',
            product_price:'',
            product_status:'Available',
            product_posted_by:owner,
            product_image:null,
            item: {},
            file:"",
            imagePreviewUrl:"",
            seller_id: owner_id,
            showModal : false,
            showAlertModal : false
        }
    }

    onChangeProductName(e){
        this.setState({
            product_name:e.target.value
        });
    }
    onChangeProductPrice(e){
        this.setState({
            product_price:e.target.value
        });
    }

    onChangeProductPostedBy(e){
        this.setState({
            product_posted_by:e.target.value
        });
    }
    onChangeProductImage(e){
        e.preventDefault()
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
            file: file,
            imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
        showModal : true
        });
    }

    createProduct = e => {
      var owner = localStorage.getItem('login');

      const newProduct={
          product_name:this.state.product_name,
          product_price:this.state.product_price,
          product_status:this.state.product_status,
          product_posted_by:this.state.product_posted_by,
          seller_id : this.state.seller_id
      }


      const formData = new FormData();
      formData.append("product_name" , this.state.product_name);
      formData.append("seller_id" , this.state.seller_id);
      formData.append("product_price", this.state.product_price);
      formData.append("product_status",this.state.product_status);
      formData.append("product_posted_by", this.state.product_posted_by);
      formData.append("imageName",this.state.file,this.state.file.name);



      axios.post('http://localhost:5000/api/products/add', formData )
      .then(res => console.log(res.data));

      this.setState({
          product_name:'',
          product_price:'',
          product_status:'Available',
          product_posted_by:owner,
          showModal : false,
          showAlertModal : true
      });

    }
    close = e => {
      this.setState({showModal : false});
    }
    alertClose = e =>{
      this.setState({showAlertModal : false});
      this.props.history.push('/');
      window.location.reload();
    }
    render(){
        return (
            <div style={{marginTop:20}}>
                    <h3>Add your product to sell</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label> Name:</label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.product_name}
                                    onChange={this.onChangeProductName}
                                    />
                        </div>
                        <div className="form-group">
                            <label> Price(USD):</label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.product_price}
                                    onChange={this.onChangeProductPrice}
                                    />
                        </div>

                        <div className="form-group">
                        <input type="file" name="imageName"  onChange= {this.onChangeProductImage} />
                        </div>

                       <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"></input>
                       </div>

                    </form>
                    <PromptModal
                      show = {this.state.showModal}
                      primaryaction = {this.createProduct}
                      close = {this.close}
                      primarytext = "Post to Market Place"
                      secondarytext = "Close"
                      heading = "Do you want to Post to Market Place for sure?"
                      body = "If Yes Press Post to Market Place else click the button close"/>

                    <AlertModal
                        show = {this.state.showAlertModal}
                        close = {this.alertClose}
                        heading = "Success"
                        body = "Your Product has been posted to the MarketPlace"
                        text = "Close"/>
            </div>
        )
    }
}
