import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Feed from './components/feedComponent/feed';
import Map from './components/mapComponent/map';
import Account from './components/accountComponent/account';
import { ThunkDispatch } from 'redux-thunk';
import Landing from './components/landingComponent/landing';
import { cookieLogin } from './store/user/userActions';
import { fetchJobs } from './store/job/jobActions';
import { connect } from 'react-redux';

interface dispatchProps {
  dispatch: ThunkDispatch<any, any, any>;
}

type Props = dispatchProps;

const App: React.FC<Props> = (props: Props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    props.dispatch(cookieLogin());
    props.dispatch(fetchJobs());
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div>
      <Navbar />
      <div className="contentWrapper">
        <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route path="/jobs" render={() => <Feed />} />
          <Route path="/map" render={() => <Map />} />
          <Route path="/account" render={() => <Account />} />
          <Redirect to="/jobs" />
        </Switch>
      </div>
      {width <= 600 ? <Footer /> : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

export default connect<null, dispatchProps>(null, mapDispatchToProps)(App);
