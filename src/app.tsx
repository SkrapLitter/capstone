import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Feed from './components/feedComponent/feed';
import Map from './components/mapComponent/map';
import Account from './components/accountComponent/account';
import CreateJob from './components/jobComponents/createJob';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Landing from './components/landingComponent/landing';
import JobDetails from './components/jobDetailsComponent/jobDetails';
import EditJob from './components/jobDetailsComponent/editJob';
import Inbox from './components/inboxComponent/inbox';
import { cookieLogin } from './store/user/userActions';
import SelectedChatroom from './components/inboxComponent/chatroom';
// import { fetchChatroomMessages } from './store/inbox/inboxActions';
// import { StoreState } from './store/store';
// import { fetchNewAlerts } from './store/alert/alertActions';
// import Axios from 'axios';
// import socket from './socket';
import { addMessage } from './store/inbox/inboxActions';
import { setAlert } from './store/alert/alertActions';
// import Axios from 'axios';
import socket from './socket';
import Stripe from './components/stripeComponent/stripe';
import PhotoVerification from './components/jobDetailsComponent/photoVerification';
import Checkout from './components/checkoutComponent/checkout';

const App: React.FC = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state: StoreState) => state);

  useEffect(() => {
    dispatch(cookieLogin());
  }, []);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     Axios.put(`/api/user/socketConnect/${socket.id}`);
  //   });
  //   return () => socket.disconnect();
  // }, []);

  // socket.on('newMessage', data => {
  //   const users = data.chatusers.split('/');
  //   if (users.includes(user.id)) {
  //     dispatch(fetchChatroomMessages(data.id, user.id));
  //   }
  // });
  // socket.on('alert', id => {
  //   if (id === user.id) {
  //     dispatch(fetchNewAlerts(id));
  //   }
  // });
  socket.on('newMessage', data => {
    console.log(data);
    dispatch(addMessage(data));
  });
  socket.on('alert', alert => {
    dispatch(setAlert(alert));
  });
  return (
    <div>
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
  );
};

export default App;
