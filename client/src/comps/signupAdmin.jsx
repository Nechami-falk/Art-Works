import React  from 'react'
import Joi from "joi-browser";
import PageHeader from './common/pageHader';
import { toast } from 'react-toastify';
import {apiUrl} from '../config.json';
import http from '../services/httpService';
import Form from './common/form';



class signupAdmin extends Form {
    state = { 
        data:{name:"", last:"", email:"", password:"", phone:"", adress:"", admin:true},
        errors:{}

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


doSubmit = async() =>{

    const data = {...this.state.data };

    

        try{
            await http.post(`${apiUrl}/users/admin`, data);
            toast(`${data.name} נרשמת כמנהל בהצלחה`);
            this.props.history.replace('/loginAdmin');
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
                <PageHeader titleText= "הרשמה כמנהל"/>
                <div className="row justify-content-center">
                                <div className="col-lg-4">
                                <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="form-control mt-3 h2">
                                {this.renderInput("name","שם פרטי")}
                                {this.renderInput("last","שם משפחה")}
                                {this.renderInput("email","מייל", "email")}
                                {this.renderInput("password","סיסמא", "password", "לפחות 6 תווים")}
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
 
export default signupAdmin
;