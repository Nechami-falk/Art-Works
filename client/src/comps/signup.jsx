import React from 'react';
import Form from './common/form';
import Joi from "joi-browser";
import PageHeader from './common/pageHader';
import http from '../services/httpService';
import { toast } from 'react-toastify';
import {apiUrl} from '../config.json';

class Signup extends Form {
    state = { 
        data:{name:"", last:"", email:"", password:"", phone:"", adress:"", admin:false},
        errors:{ }

     }

    schema = {
        name:Joi.string().min(2).max(255).required().label("שם פרטי").error(()=>{
            return{
                message: "לפחות שתי תויים"
            }
        }),
        last:Joi.string().min(2).max(255).required().label("שם משפחה").error(()=>{
            return{
                message: "לפחות שתי תויים"
            }
        }),
        email: Joi.string().min(2).max(255).required().label("מייל").regex(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/).error(()=>{
            return {
                message:'מייל לא חוקי'
            }
        }),
        password: Joi.string().min(8).max(1000).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'password').required().error(()=>{
            return{
                message:' הסיסמא חייבת להכיל 8 תווים, אות גדולה באנגלית, אות קטנה באנגלית וספרה'
            }
        }).label("סיסמא"),
        phone: Joi.string().min(2).max(10).required().regex(/^[0-9]*$/).label("טלפון").error(()=>{
          return{
              message:"ספרות בלבד"
          }
        }),
        adress: Joi.string().min(2).max(255).label("כתובת").error(()=>{
            return{
                message:"לפחות שתי תויים"
            }
        }),
        admin: Joi.boolean()
    }


    doSubmit = async() => {
        
        const data = {...this.state.data };

        try{
            await http.post(`${apiUrl}/users`, data);
            toast.success(`${data.name} נרשמת בהצלחה`);
            this.props.history.replace('/login');
        }
        catch (ex){
            if(ex.response && ex.response.status === 400){
                 this.setState({errors:{email:'אימייל רשום במערכת'}});
            }
        }
        
    }

    render() { 
        return ( 
            <div>
                <PageHeader titleText= "הרשמה לאתר"/>
                <div className="row justify-content-center">
                                <div className="col-lg-4">
                                <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="form-control mt-2 h4">
                                {this.renderInput("name","שם פרטי")}
                                {this.renderInput("last","שם משפחה")}
                                {this.renderInput("email","מייל", "email")}
                                {this.renderInput("password","סיסמא", "password", "חייב להכיל 8 תווים, אות גדולה 1, אות קטנה 1,")}
                                {this.renderInput("phone", "טלפון")}
                                {this.renderInput("adress", "כתובת")}
                                {this.renderButton("שלח")}
                                </form>
                                </div>
                </div>
            </div>
         );
    }
}
 
export default Signup;