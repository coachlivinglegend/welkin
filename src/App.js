import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home/Home'
import Awards from './pages/Awards/Awards'
import AboutUs from './pages/AboutUs/AboutUs'
import Admissions from './pages/Admissions/Admissions'
import Gallery from './pages/Gallery/Gallery'
import News from './pages/News/News'
import Careers from './pages/Careers/Careers'
import Welkinpedia from './pages/Welkinpedia/Welkinpedia'
import ContactUs from './pages/ContactUs/ContactUs'
import Portal from './pages/Portal/Portal'
import Admin from './pages/Admin/Admin'
import AdminRegister from './pages/Admin/AdminRegister/AdminRegister'



function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/awards' component ={Awards}/>
          <Route path='/aboutus' component ={AboutUs}/>
          <Route path='/admissions' component ={Admissions}/>
          <Route path='/gallery' component ={Gallery}/>
          <Route path='/news' component ={News}/>
          <Route path='/careers' component ={Careers}/>
          <Route path='/welkinpedia' component ={Welkinpedia}/>
          <Route path='/contactus' component ={ContactUs}/>
          <Route path='/portal' component ={Portal}/>
          <Route path ='/admin' component ={Admin}/>
          <Route path ='/admin-register' component ={AdminRegister}/>
        </Switch>
    </div>
  );
}

export default App;
