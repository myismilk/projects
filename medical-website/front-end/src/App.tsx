import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './background/background';
import { HashRouter as Router, Route } from "react-router-dom";
import FirstPage from './pages/firstPage/index';
import ChooseHos from './pages/chooseHos/index';
import Register from './pages/register/index';
import PwSet from './components/pwSet/index';
import HosPwSet from './components/hosPwReset/index';
import PwForget from './components/pwForget/index';
import User from './pages/userPage/index';
import Doctor from './pages/doctorPage/index';
import HealthTips from './pages/detailPage/healthyTips/index';
import Announcement from './pages/detailPage/announcement/index';
import Comment from './pages/comment/index';

import HospitalLogin from './hospital/login/index';
import Features from './hospital/features/index';
import ReservationDetail from './hospital/detailReservation/index';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <>
        <Background />
        <Router>
          <Route exact path="/" component={FirstPage} />
          <Route path="/chooseHos" component={ChooseHos} />
          <Route path="/register" component={Register} />
          <Route path="/pwSet" component={PwSet} />
          <Route path="/hosPwSet" component={HosPwSet} />
          <Route path="/pwForget" component={PwForget} />
          <Route path="/user" component={User} />
          <Route path="/doctor" component={Doctor} />
          <Route path="/healthyTips" component={HealthTips} />
          <Route path="/announcement" component={Announcement} />
          <Route path="/comment" component={Comment} />
          <Route path="/hospital/login" component={HospitalLogin} />
          <Route path="/hospital/features" component={Features} />
          <Route path="/hospital/details" component={ReservationDetail} />
        </Router>
      </>
    )
  }
}

export default App;
