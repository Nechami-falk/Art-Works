import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Home extends Component {
    state = { 
        homeProduct:[
            {id:1, title:'צביעה באקריליק', image:"https://www.artdepot.co.il/10415/%D7%A2%D7%A8%D7%9B%D7%AA-%D7%A6%D7%91%D7%99%D7%A2%D7%94-%D7%92%D7%93%D7%95%D7%9C%D7%94-%D7%A2%D7%9C-%D7%A7%D7%A0%D7%91%D7%A1-%D7%A9%D7%A2%D7%A8-%D7%91%D7%92%D7%99%D7%A0%D7%94.jpg"},
            {id:2, title:'יצירות יהלומים', image:"https://www.layeledv.co.il/images/itempics/6083_03062020214159_large.jpg"},
            {id:3, title:'קישוטי סוכה', image:"https://www.havakuk.com/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-24-at-17.04.00-300x300.jpeg"},
            {id:4, title:'מיניאטורות', image:"https://ae01.alicdn.com/kf/HTB1DF01XiDxK1Rjy1zcq6yGeXXad/Miniature-Dollhouse-Pink-Melody-Handmake-DIY-Wood-Children-Kids-Doll-House-With-Dust-Cover-Decoration-Adult.jpg"},
            {id:5, title:'בניה מעץ', image:"https://cdn.usbid.co.il/productimages/40820-%D7%A2%D7%A8%D7%9B%D7%AA-%D7%94%D7%A8%D7%9B%D7%91%D7%94-%D7%A4%D7%90%D7%A8%D7%A7-%D7%A9%D7%A2%D7%A9%D7%95%D7%A2%D7%99%D7%9D-lg1.jpg"},
            {id:6, title:'בניה מקאפה', image:"https://www.zuravazeva.co.il/images/itempics/2558_030620211517161_small160.jpg"},
            {id:7, title:'מתיחת חוטים', image:"https://www.bernina.co.il/images/itempics/418_10032021112958_large.jpg"},
            {id:8, title:'סרגלי הקסם', image:"https://www.shaboart.co.il/images/itempics/503256_150920202241000_large.jpg"},
            {id:9, title:'מדבקות הקסם', image:"https://www.היריד-היצירתי.co.il/wp-content/uploads/2020/06/55-300x300-1.jpg"},
          ]
    }


    render() { 
        return ( 
            <div className="container">
                <div className="row">{this.state.homeProduct.map( item => 
                    (<Link to={`/showproduct/${item.title}`} key={item.id} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 d-inline-block text-decoration-none text-center">
                    <div className="card div-home-image" style={{width: "16rem", backgroundColor:"#0d0d61"}}>
                        <h2 className="card-title" style={{color:"hsl(51, 100%, 50%)"}}>{item.title}</h2>
                        <img src={item.image} className="card-img-top" alt={item.title}/>
                    </div>
                    </Link>
                    ))}; 
                </div>
            </div>        
         )
    }
}
 
export default Home;