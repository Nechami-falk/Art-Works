import React, { Component } from 'react';
import Joi from 'joi-browser';
import userService from '../services/userService'; 
import {Link} from 'react-router-dom';


class Product extends Component {

    valueRef= React.createRef();

    schema = {
        valueCounter: Joi.number().min(1).max(1000)
    }

    state = { 
        data:"",
        cart_ar:[],
        counter: 0 
     }


    componentDidMount () {
        const user = userService.getCurrentUser();
        this.setState({user});
    
        const admin = userService.getCurrentAdmin();
        this.setState({admin});
    
        
      }

    

    handleChangeCounter (e) {
        let value = e.target.value;
        if (value === ""){
            return alert("הקלד מספר בלבד!")
        }
        if(value > 10000){
            return alert("כמות מוגבלת עד 10000")
        }
        this.setState({ counter:value });
        this.props.getCounter(value); 
       
    }

    setCounter = (ob) => {
        let  counter  = this.state.counter;
        if ( ob === 'plus') counter++;
        else if ( ! counter <= 0) counter--;
        this.setState({ counter: counter});
        this.props.getCounter(counter);
        
    }     

   

    render() {
const { product, onDeleteProduct, onAddNewProduct } = this.props;


const {admin} =this.state;


        return ( 
            <React.Fragment>
        
        
                    
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xxl-3 d-inline-block">
                            <div className="card" style={{width:"16rem"}}> 
                            <img src={ product.image ?  product.image : `https://d3m9l0v76dty0.cloudfront.net/system/photos/574811/original/e86fdd306f6d4885033ff36ce9b67034.jpg?1620216252`} alt="" className="card-img-top"/>
                            <div className="card-body p-0 text-center">
                                
                                <h1 className="card-title h4 mt-2">{product.name}</h1>
                                <p className="card-text m-1" style={{fontWeight:"bold"}}>{product.description}</p>
                                <p className="card-text m-1" ><span style={{fontWeight:"bold"}}>מספר מק"ט: </span>{product.catalogNumber}</p>
                                <p className="card-text m-1"><span style={{fontWeight:"bold", marginEnd:"0px"}}>מתאים לגיל: </span>{product.age}</p>
                                {product.sale && 
                                <p className="card-text m-1" style={{textDecoration:"line-through"}}><span style={{fontWeight:"bold"}} >מחיר:</span> {product.price} ש"ח</p>
                                }
                                { ! product.sale &&
                                <p className="card-text m-1"><span style={{fontWeight:"bold"}} >מחיר:</span> {product.price} ש"ח</p>
                                }
                                { product.sale &&
                                    <p className="card-text m-1"><span style={{fontWeight:"bold"}}>מחיר מבצע:</span> {product.sale} ש"ח</p>
                                }
                                { ! product.sale && 
                                 <p className="card-text m-1" style={{visibility:"hidden"}}>""</p>
                                }
                                { !admin &&
                                <div className="container-fluid">
                                <div className="row justify-content-center">
                                <button disabled={this.state.counter === 0} onClick ={ () =>onAddNewProduct(product)} className="btn-sm btn-prod m-0 col-5 mb-1"><i className="fas fa-cart-plus"></i></button>
                              
                                <div className="row col-8 justify-content-center lh-lg mb-1">
                                <button className="col-2  btnOrd"  onClick={()=> this.setCounter('plus')} >+</button>
                                <input type="number" className="no-outline col-4 btnOrd btnOrd2 text-center" value={this.state.counter} name="valueCounter"  onChange={(e)=> this.handleChangeCounter(e)}></input>
                                <button className="col-2 btnOrd" onClick={() => this.setCounter('minus')} >-</button>
                                </div>
                                </div>
                                </div>
                                }
                                { admin && 
                                <div className="container">
                                <div className="row m-2">
                                <Link to="#" className="btn-sm col-lg-5 btn-prod ms-3 mb-1" onClick={ () => onDeleteProduct(product._id)}>מחק<i className="fas fa-trash-alt"></i></Link>
                                <Link to={`/editProduct/${product._id}`} className="btn-sm btn-prod col-lg-5 ms-2 mb-1" style={{}}>עדכן<i className="fas fa-edit"></i></Link>
                                </div>
                                </div>
    }
                        
                            </div>
                            </div>
                           
                            
                        </div>

                        
                     
            
            </React.Fragment>
         );
    }

}
export default Product;