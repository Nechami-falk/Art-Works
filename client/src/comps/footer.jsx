import React from 'react';

function Footer(props){
    return(
        <div className="container-fluid my-footer h5 text-center">
            <div className="row">
                <div className="col-lg-6">
                    <p>שעות תעסוקה</p>
                    <p>כתובת רחוב ישראל 14</p>
                    </div>
                    <div className="col-lg-6">
                    <p>ליצירת קשר</p>
                    <p><i className="fas fa-phone"></i>00000000  <i className="fas fa-envelope-square me-3"></i>abc@gmail.com</p>
                </div>
            </div>
        </div> 
    )
}

export default Footer