import React from 'react';
import Home from './component/App';
import { BrowserRouter, Route } from 'react-router-dom';
 
class RouteApp extends React.Component{

    render() {
        return(
            <BrowserRouter> 
                <Route path="/" component={Home}>
                </Route>
            </BrowserRouter>
        ) 
    }
}
export default RouteApp;