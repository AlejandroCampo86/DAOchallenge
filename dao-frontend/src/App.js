import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ProposalList from './pages/proposalListPage/proposalList';
import ProposalDetails from './pages/proposalDetailsPage/proposalDetails';
import Login from './pages/loginPage/login';
import { AuthProvider } from './context/authContext';
import About from './pages/aboutPage/about';
import Navbar from './components/navbar';
import VoteComponent from './pages/votePage';


const history = createBrowserHistory();

function App() {

  return (
    <Router history={history}>
      <AuthProvider history={history}>
        <Navbar />
        <RoutingLogic />
      </AuthProvider>
    </Router>
  );
}

function RoutingLogic() {
  return (
    <div className="bg-dark text-white d-flex align-items-center justify-content-center min-vh-100 p-4">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/proposals" component={ProposalList} />
        <Route exact path="/proposals/:id" component={ProposalDetails} />
        <Route exact path="/proposals/:id/vote" component={VoteComponent} />
        <Route exact path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
