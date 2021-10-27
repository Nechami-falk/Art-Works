import React from 'react';
import PageHeader from './common/pageHader';
import history from '../js/history';

class Page404 extends React.Component {



    render() { 
        return <div>
          <PageHeader titleText="404 Page Not Found"></PageHeader>
          <div className="container text-center mt-5">
          <button onClick={() => history.goBack()} className="btn btn-warning">חזור  אחורה</button>
          </div>
        </div>;
    }
}
 
export default Page404;
