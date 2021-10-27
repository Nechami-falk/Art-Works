import React, { Component } from 'react';
import userService from '../services/userService';

class Logout extends Component {
    state = {  }

componentDidMount(){
    userService.lgout();
    window.location = '/login';
}

    render() { 
        return ( 
            <div>
               
                
            </div>
         );
    }
}
 
export default Logout;