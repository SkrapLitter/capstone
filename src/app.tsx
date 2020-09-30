import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Feed from './components/feedComponent/feed';
import Map from './components/mapComponent/map';
import Account from './components/accountComponent/account';
import CreateJob from './components/jobComponents/createJob';
import { useDispatch } from 'react-redux';
import Landing from './components/landingComponent/landing';
import JobDetails from './components/jobDetailsComponent/jobDetails';
import EditJob from './components/jobDetailsComponent/editJob';
import Inbox from './components/inboxComponent/inbox';
import { cookieLogin } from './store/user/userActions';
import SelectedChatroom from './components/inboxComponent/chatroom';
import { addMessage } from './store/inbox/inboxActions';
import { setAlert } from './store/alert/alertActions';
import Axios from 'axios';
import socket from './socket';
import Stripe from './components/stripeComponent/stripe';
import PhotoVerification from './components/jobDetailsComponent/photoVerification';
import Checkout from './components/checkoutComponent/checkout';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import '../public/uiUpdate.scss';
import '../public/style.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cookieLogin());
  }, []);
  socket.on('connect', () => {
    Axios.put(`/api/user/socketConnect/${socket.id}`);
  });
  socket.on('newMessage', data => {
    dispatch(addMessage(data));
  });

  socket.on('alert', alert => {
    dispatch(setAlert(alert));
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="bodyContainer">
        <Navbar />
        <div className="contentWrapper">
          <Switch>
            <Route exact path="/" render={() => <Landing />} />
            <Route path="/stripe/:id" component={Stripe} />
            <Route path="/map" render={() => <Map />} />
            <Route path="/account" render={() => <Account />} />
            <Route exact path="/jobs" component={Feed} />
            <Route path="/jobs/:id" component={JobDetails} />
            <Route path="/job/edit/:id" component={EditJob} />
            <Route path="/create" component={CreateJob} />
            <Route exact path="/inbox" component={Inbox} />
            <Route path="/inbox/:id?" component={SelectedChatroom} />
            <Route path="/verify/:id" component={PhotoVerification} />
            <Route path="/checkout/:id" component={Checkout} />
            <Redirect to="/jobs" />
          </Switch>
        </div>
        <Footer />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
