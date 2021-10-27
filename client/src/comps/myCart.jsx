import React from 'react'
import {Link} from 'react-router-dom';
import history from '../js/history';
import Cart from './cart';
import lodash from 'lodash';
import {toast} from 'react-toastify';

class MyCart extends React.Component {

   state = {
      cart_ar:[],
      totalPrice : 0
     } 

    componentDidMount(){
        let cart = JSON.parse( localStorage.getItem("your-cart"));
        if (! cart ){
            toast ( "אין מוצרים בעגלה!");
            history.push('/');
        }
        else{
        this.setState({cart_ar: cart});
        this.totalPrice();
       
    }
}
       
    multi(num1, num2){
    return num1*num2
}


    totalPrice(){
        const cart = JSON.parse( localStorage.getItem("your-cart"));
        const newArray = cart.map( p => p.product.price * p.quantity);
        let sum  = lodash.sum(newArray);
               this.setState({totalPrice:sum});
    }


    onDelCartProd = (productId)=> {
        let cart = [...this.state.cart_ar];
        let filterCart= cart.filter( product => product.product._id !== productId );
        localStorage.setItem("your-cart", JSON.stringify(filterCart));
        this.setState({cart_ar:filterCart});
        this.totalPrice();
    }
    
    render() { 

        const { cart_ar} = this.state;


        return (
            <React.Fragment>
                <div>
                    <div className="container col-lg-8">
                        <table id="cart" className="table table-hover table-condensed" style={{color:"#0d0d61"}}>
                            <thead>
                                <tr>
                                    <th style={{width:"50%"}}>שם המוצר</th>
                                    <th style={{width:"10%"}}>מחיר</th>
                                    <th style={{width:"8%"}}>כמות</th>
                                    <th style={{width:"22%"}} className="text-center"></th>
                                    <th style={{width:"10%"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart_ar && cart_ar.map ( product => (<Cart key={product.product._id} duplicatesProd={this.duplicatesProd} onDelCartProd={this.onDelCartProd} product={product}/>))} 
                            </tbody>
                            <tfoot>
                                <tr className="visible-xs">
                                    <td className="text-center"><strong></strong></td>
                                </tr>
                                <tr>
                                    <td><button onClick={() => history.goBack()} className="btn btn-warning"><i className="fa fa-angle-left"></i>המשך קניות</button></td>
                                    <td colSpan="2" className="hidden-xs"></td>
                                    <td className="hidden-xs text-center"><strong>סך הכל : {this.state.totalPrice} ש"ח</strong></td>
                                    <td><Link to="#" className="btn btn-success btn-block">לתשלום <i className="fa fa-angle-right"></i></Link></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        ) 
    }
}
 
export default MyCart;