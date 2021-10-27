import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import PageHeader from './common/pageHader';
import { toast } from 'react-toastify';
import productService from '../services/productService';


class AddProduct extends Form {

    categoriesAr = ['ציורי הקסם','סרגלי הקסם','מדבקות הקסם','בניה מעץ','בניה מקאפה','מתיחת חוטים','מניאטורות','צביעה באקריליק','יצירות יהלומים','קישוטי סוכה'];

    state = { 
        data:{name:"", price:"", category:"", catalogNumber:"", description:"", tags:"", age:""},
        errors:{ }

     }

    schema = {
        name:Joi.string().min(2).max(255).required().label("שם המוצר"),
        price: Joi.number().min(1).max(100000).required().label("מחיר"),
        category: Joi.string().min(2).max(255).required().invalid('בחר').label("קטגוריה"),
        catalogNumber: Joi.string().min(1).max(2000000).required().label('מספר מק"ט'),
        description: Joi.string().min(2).max(1000).label("תאור"),
        tags: Joi.string().label("תגיות"),
        age: Joi.string().label("גיל"),
        sale: Joi.number().min(2).max(100000).label("מחיר מבצע"),
        image: Joi.string().min(2).max(1000).label("תמונה")
    }


    doSubmit = async() => {
        const { data } = this.state;
        try{
        await productService.addProduct(data);
        toast('המוצר התווסף בהצלחה!');
        this.props.history.push(`/showProduct/${data.category}`);
        }
        catch(ex){
            if (ex.response  && ex.response.status === 409){
                this.setState({ errors:{catalogNumber: 'מספר מק"ט קיים'}});
            }
        }
    }
        
    
    

    render() { 

 

        return ( 
            <React.Fragment>
                <div className="container">
                    <PageHeader titleText="הוספת מוצר"/>
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                    
                                <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="form-control mt-3 h2">
                                    {this.renderInput("name", "שם המוצר")}
                                    {this.renderInput("description", "תאור")}
                                    {this.renderSelect("category","קטגוריה", this.categoriesAr)}
                                    {this.renderInput("catalogNumber", 'מספר מק"ט',"number" )}
                                    {this.renderInput("age", 'גיל' )}
                                    {this.renderInput("price", "מחיר","number")}
                                    {this.renderInput("tags", "תגיות")}
                                    {this.renderInput("sale", "מחיר מבצע")}
                                    {this.renderInput("image", "תמונה")}
                                    {this.renderButton("הוסף")}
                                </form>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
        );
    }
}
 
export default AddProduct