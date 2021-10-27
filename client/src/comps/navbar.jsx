import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap'; 
import {NavLink} from 'react-router-dom';
import { Route } from 'react-router-dom';


class NavBar extends Component {
 
   state = { 
        products:[],
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
 
    nameCategory =  [

        {id:2, name:"צביעה באקריליק", category:"expressedAcrylic"},
        {id:3, name:"יצירות יהלומים", category:"diamondWorks"},
        {id:4, name:"מניאטורות", category:"miniatures"},
        {id:5, name:"בניה מעץ", category:"creationWood"},
        {id:6, name:"בניה מקאפה", category:"creationKappa"},
        {id:7, name:"מתיחת חוטים", category:"stretchingWires"},
        {id:8, name:"סרגלי הקסם", category:"wonderBars"},
        {id:9, name:"ציורי הקסם", category:"wonderPaintings"},
        {id:10, name:"מדבקות הקסם", category:"magisStickers"},
        {id:11, name:"קישוטי סוכה", category:"sukkahDecoration"},
    ]





    render() {
        return(
            <React.Fragment>
                <Navbar expand="lg" className="container-fluid" style={{backgroundColor:"rgb(255, 196, 0)", margin:"0px !important", padding:"0px !important"}}>
                <Container fluid>
                <Navbar.Brand href="/"><i className="fas fa-home"  style={{color:"#0d0d61"}}></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll" >
                <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll>
                {this.nameCategory.map (item => (<NavLink to= {`/showproduct/${item.name}`} className="btn" key={item.id}  style={{fontWeight:"bold", color:"#0d0d61", marginRight:"3px"}}>{item.name}</NavLink>))}
                </Nav>
              <div className="css-search">
      <Form className="d-flex">
        <FormControl

          type="search"
          placeholder="חיפוש..."
          className="ms-2"
          aria-label="Search"
          value={this.state.value}
          onChange={this.handleChange}
          />
          <Route render={({ history}) => (
        <Button variant="outline-success" type="submit"  onClick={(e) => {this.handleSubmit(e, history)}} value="Submit" style={{color:"#0d0d61"}}>חיפוש</Button>)}></Route>
      </Form>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>




            </React.Fragment>
        )
    }
}

export default NavBar