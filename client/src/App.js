import React, { Component } from 'react'
import './sass/main.css';

import {Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './comps/home';
import AddProduct from './comps/addProduct';
import EditProduct from './comps/editProduct';
import Footer from './comps/footer';
import Header from './comps/header';
import Signup from './comps/signup';
import Login from './comps/login';
import SignupAdmin from './comps/signupAdmin';
import ProtectedRoute from './comps/common/protectedRoute';
import ProtectedRouteUser from './comps/common/protectedRouteUser';
import userService from './services/userService';
import LoginAdmin from './comps/loginAdmin';
import Logout from './comps/logout';
import MyCart from './comps/myCart';
import ButtonNav from './comps/buttonNav';
import Product from './comps/product';
import ShowProduct from './comps/showProduct';
import Cart from './comps/cart';
import { toast } from 'react-toastify';
import NavBar from './comps/navbar';
import Page404 from './comps/page404';
import http from './services/httpService';


class App extends Component {


  state={
    data:[]
  };

  componentDidMount(){
    const user = userService.getCurrentUser();
    this.setState({user});

    const admin = userService.getCurrentAdmin();
    this.setState({admin});

    this.getProducts();
    this.getMassege();
  }

  getProducts = async ()=>{
    let product = await http.get('http://localhost:8181/data/product');
    this.setState({data:product});
      
    
  }

  getMassege = () =>{
    toast(`!לקוח יקר שים לב
     כרגע אין שרות משלוחים`)
  }

  render (){
    
    const {user} = this.state;
    const {admin} = this.state;

    return(
    <React.Fragment>
    <div className="App">
    <header className="container-fluid p-0" style={{backgroundColor:"#0d0d61"}}>
      <ToastContainer/>
      <Header/>
      <ButtonNav  user={user} admin={admin}/>
      <NavBar/>
      
      </header>
    <main className="minh-900">
      <Switch>
        <ProtectedRouteUser path="/myCart" component={MyCart} user={true}/>
        <Route path="/showProduct/:name" component={ShowProduct}  user={user} admin={admin}/>
        <Route path="/showProduct" component={ShowProduct} user={user} admin={admin}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/signupAdmin" component={SignupAdmin}/>
        <Route path="/loginAdmin" component={LoginAdmin}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart}/>
        <Route path="/navbar" component={NavBar}/>
        <Route path="/product" component={Product}/>
        <ProtectedRoute path="/editProduct/:id" component={EditProduct} admin={true}/>
        <ProtectedRoute path="/addProduct" component={AddProduct} admin={true}/>
        <Route  exact path="/" component={Home}/>
        <Route path="/" component={Page404} />
        
      </Switch>
    </main>
    <footer>
    <Footer/>
   </footer>
</div>
</React.Fragment>
)
 }
 }
export default App;
