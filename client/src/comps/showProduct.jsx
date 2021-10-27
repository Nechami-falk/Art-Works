import React , { Component }from 'react';
import Product from './product';
import productService from '../services/productService';
import { toast } from 'react-toastify';
import PageHeader from './common/pageHader';
import http from "../services/httpService";


class ShowProduct extends Component {

   


    state = {
        category :"",
       products:[],
       userCart:[],
       counterProduct:0,
       search:""
    }



    componentDidMount = async () =>  {
        
        let categoryParams  = this.props.match.params.name;
        let querySerch = this.props.location.search;
        
        if (categoryParams){
        this.setState({category: categoryParams});
        const { data }  = await productService.getCategoryProduct (categoryParams);
        this.setState({products:data, search:""});
    } 
    else{
        const queryName =  new URLSearchParams(querySerch).get("search");
        this.setState({search:queryName});
        const { data } = await productService.getSearchProduct(queryName);
        this.setState({products:data, category:""});
        
        if( this.state.products.length < 1){
            this.getDemoProduct()
        }
    }
}


    getDemoProduct = async ()=>{
            let products = await http.get('http://localhost:8181/data/product');
            this.setState({data:products});
              console.log(products);
            
          }



        componentDidUpdate = async() =>{
        let categoryParams  = this.props.match.params.name;
        const queryName =  new URLSearchParams(this.props.location.search).get("search");
        if (this.state.category !== categoryParams && categoryParams){
            return this.componentDidMount();
        }

        if ( this.state.search !== queryName && this.props.location.search){
            return this.componentDidMount();
        }

    
    } 
   
    getCounter = (count) => {
        let counter = count;
        this.setState({counterProduct:counter});
    }

    onSerch = async()=> {
        let {value} = this.state;
        const {data} = await productService.onMySerch(value);
        this.setState({products:data})
  
      }
    
    onAddNewProduct = (product) => {
        let counterProduct = this.state.counterProduct;
        let newProduct={
            product:product,
            quantity:counterProduct
        }
        let localstorgeCart=JSON.parse(localStorage.getItem("your-cart")) || [];
        localstorgeCart = localstorgeCart.filter( p => p.product._id !== newProduct.product._id);
        localstorgeCart.push(newProduct);
        localStorage.setItem("your-cart", JSON.stringify(localstorgeCart));
        toast.success("המוצר נוסף  לסל בהצלחה!");
        

    }

        onDeleteProduct  = async (productId)=> {
        let products = [...this.state.products];
        products = products.filter(product => product._id !== productId);
        this.setState({products:products});
        await productService.deleteProduct(productId);
        toast('המוצר נמחק בהצלחה!');
        
    }

    render() { 
        
        const { products } = this.state;
        

        return <div>
            <div className="container">
                <PageHeader titleText={this.state.category || (products.length > 0  && this.state.search)}/>
                 {( !products || !products.length ) && <PageHeader titleText ="לא נמצאו מוצרים מתאימים לחיפוש"/>}
                <div className="row">
                <div>{products.map( product => (<Product key={product._id} product={product} onDeleteProduct={this.onDeleteProduct} onAddNewProduct={this.onAddNewProduct} getCounter={this.getCounter} counterProduct={this.state.counterProduct}/>))}</div>

                </div>
            </div>
        </div>;
    }
}
 
export default ShowProduct;