import React from 'react';
import {Nav} from  'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import {Button} from 'react-bootstrap';


class ButtonNav extends React.Component {

    state={
        value:""
    }
    
    handleChange =(event) =>{
        let input = this.state.value;
        input = event.target.value;
        this.setState({value:input});
       
       
      } 
  
      
    
      handleSubmit =(e, history)=>{
        e.preventDefault();
        let input = this.state.value;
        history.push(`/showProduct?search=${input}`);
        this.setState({value:""})
      }


    render() { 

        const { user } = this.props;
        const {admin} = this.props;

        return (
           <React.Fragment>
               <div className="container-fluid row button-nav " style={{backgroundColor:"#0d0d61", color:"white", textDecoration:"none"}}>
                   <div className="col-lg-7 col-10 m-1">
                        <Nav>
                            { admin && (
                            <Nav.Item> 
                                <NavLink to="/addProduct" className="btn-nav" style={{color:"white", textDecoration:"none", marginBottom:"2px"}}>הוספת מוצר</NavLink>
                            </Nav.Item>)}

                            { !user && (
                            <React.Fragment>
                                <Nav.Item>
                                    <NavLink to="/login" className="btn-nav me-3" style={{color:"white", textDecoration:"none"}}>כניסה</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to="/signup" className="btn-nav me-3" style={{color:"white", textDecoration:"none"}}>הרשמה</NavLink>
                                </Nav.Item>
                            </React.Fragment>
                            )}

                            { user && (
                    
                            <Nav.Item>
                                <NavLink  to="/logout" className="btn-nav me-3" style={{color:"white", textDecoration:"none"}}>יציאה</NavLink>
                            </Nav.Item>
                            )}
                            
                        </Nav>
                    </div> 
                   
                <div className="row mt-2  col-lg-5 col-2">
                    <div className="col-9 css-search-sm">
                    <Form className="d-flex mb-2 ms-1">
                        <Route render={({ history}) => (
                        <Button variant="outline-success" className="col-3 col-lg-2 z-index-1 ms-1" type="submit"  onClick={(e) => {this.handleSubmit(e, history)}} value="Submit" style={{backgroundColor:"white"}}><i className="fas fa-search"></i></Button>)}></Route>
                        <FormControl 
                        type="search"
                        className="ms-2"
                        aria-label="Search"
                        value={this.state.value}
                        onChange={this.handleChange}/>
                        </Form>
                        </div>

                       <div className ="col-lg-2 text-center mb-2">
                       <NavLink to="/myCart" className="h3"><i className="fas fa-shopping-cart float-start" style={{color:"white", margin:"0px !important"}}></i></NavLink>
                       </div>
                
               </div>
                </div>
            </React.Fragment>
        )
    }
}
 
export default ButtonNav;