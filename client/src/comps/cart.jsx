import React from 'react';


class Cart extends React.Component {

	state={
		cart_ar:[],
	}


    render() {
        
        const { onDelCartProd, product }= this.props;

        return (
            
            <React.Fragment>
                <tr>
                    <td  data-th="Product">
                        <div className="row">
                            <div className="col-sm-4 hidden-xs"><img src={product.product.image}  alt={product.product.name} className="img-responsive" style={{width:"100px", height:"100px"}} />
                                <div className="col-sm-8">
                                    <h4 className="nomargin">{product.product.name}</h4>
                                    <p>{product.product.description}</p>
                                </div>
                            </div>
                        </div>
                    </td>
                        <td data-th="Price">{product.product.price}</td>
                        <td data-th="Quantity">
                        <p className="form-control text-center"> {product.quantity}</p>
                    </td>
                       
                        <td className="actions" data-th="">
                        <button className="btn btn-danger" style={{width:"100%"}} onClick={ ()=> onDelCartProd(product.product._id)}><i className="fa fa-trash-o"></i></button>								
                    </td>
                </tr>

            </React.Fragment>


        )

    }
}
 
export default Cart;