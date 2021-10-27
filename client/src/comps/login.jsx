import React from 'react';
import Form from './common/form';
import Joi from "joi-browser";
import PageHeader from './common/pageHader';

import userService from '../services/userService';
class Login extends Form{

    state = { 
        data:{ email:"", password:""},
        errors:{ }

     }

    schema = {
        email: Joi.string().min(2).max(255).required().label("מייל").regex(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/).error(()=>{
            return {
                message:'מייל לא חוקי'
            }
        }),
        password: Joi.string().min(8).max(1000).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'password').required().error(()=>{
            return{
                message:' הסיסמא חייבת להכיל 8 תווים, אות גדולה באנגלית, אות קטנה באנגלית וספרה'
            }
        })
    }
    
        
    doSubmit = async() =>{
            const {email, password} = this.state.data;
            try{
                await userService.login(email, password);
                window.location='/';
            }
            catch(ex){
                if( ex.response && ex.response.status === 400){
                    this.setState({ errors: {email: ex.response.data} })

                }
            }
        }

    render() { 
        return ( 
            <div>
                <PageHeader titleText= "התחברות"/>
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="post" className="form-control mt-3 h2">
                            {this.renderInput("email","מייל", "email")}
                            {this.renderInput("password","סיסמא", "password")}
                            {this.renderButton("שלח")}
                        </form>
                    </div>
                </div>
           </div>
         );
    }
}
 
export default Login;