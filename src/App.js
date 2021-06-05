
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Customer from './Components/Customer';
import CustomerProfile from './Components/CustomerProfile';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact >
            <Customer />
          </Route>
          <Route path="/customer/:id" exact>
            <CustomerProfile/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
