import React from 'react';
import Form from './common/form';
import PageHeader from './common/pageHader';
import productService from '../services/productService';
import { toast } from 'react-toastify';
import Joi from "joi-browser";
import {Link} from 'react-router-dom';


class EditProduct extends Form {

    state = { 
        data:{ name:"", price:"", category:"", catalogNumber:"", age:"", description:"", image:"", sale:""},
        errors:{ }

     } 

     categoriesAr = ['ציורי הקסם','סרגלי הקסם','מדבקות הקסם','בניה מעץ','בניה מקאפה','מתיחת חוטים','מניאטורות','צביעה באקריליק','יצירות יהלומים','קישוטי סוכה'];

    productId= "";


    schema = {
        name:Joi.string().min(2).max(255).required().label("שם המוצר"),
        price: Joi.number().min(1).max(100000).required().label("מחיר"),
        category: Joi.string().min(2).max(255).required().label("קטגוריה"),
        catalogNumber: Joi.string().min(1).max(2000000).required().label('מספר מק"ט'),
        description: Joi.string().min(2).max(1000).label("תאור"),
        sale: Joi.number().min(1).max(100000).label("מחיר מבצע"),
        age: Joi.string().min(1).max(10).label("גיל"),
        image: Joi.string().min(2).max(1000).label("תמונה"),
        tags: Joi.string().min(2).max(1000).label("תגיות")
    }

componentDidMount = async() =>{
        this.productId = this.props.match.params.id;
        const { data } = await productService.getProduct(this.productId);
        this.setState ({ data: this.mapToViewModel(data) });
    
        

    }

    
    mapToViewModel(product){
        return{
            name: product.name,
            price: product.price,
            category: product.category,
            tags: product.tags,
            age: product.age,
            catalogNumber: product.catalogNumber.toString(),
            description: product.description,
            image: product.image,
            sale: product.sale
        };
    }

    

    


    doSubmit = async () => {
        const {data} = this.state;
        await productService.updateProduct(data, this.productId);
        toast( 'המוצר עודכן !');
        this.props.history.replace(`/showProduct/${data.category}`);

    } 

    

    

    render() { 
        return ( 
            <React.Fragment>
                
                    <div className="container">
                       <PageHeader titleText="עדכון מוצר"/>
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="form-control mt-3 h2">
                                        {this.renderInput("name", "שם המוצר")}
                                        {this.renderInput("description", "תאור")}
                                        {this.renderInput("catalogNumber", 'מספר מק"ט',"number" )}
                                        {this.renderSelect("category","קטגוריה", this.categoriesAr)}
                                        {this.renderInput("age", "גיל")}
                                        {this.renderInput("tags", "תגיות")}
                                        {this.renderInput("price", "מחיר","number")}
                                        {this.renderInput("sale", "מחיר מבצע")}
                                        {this.renderInput("image", "תמונה")}
                                        {this.renderButton("עדכן")}
                                    <Link to={`/showProduct/${this.state.data.category}`} className="btn" style={{backgroundColor:"rgb(255, 196, 0)", color:"#0d0d61", marginLeft:"2px !important"}}>חזרה<i className="fas fa-undo-alt m-1"></i></Link>
                               </form>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
}
 
export default EditProduct