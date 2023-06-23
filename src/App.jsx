import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ShortenUrlPage from './pages/ShortenUrlPage';
import AnalyticsPage from './pages/AnalyticsPage';
import UserUrlsPage from './pages/UserUrlsPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/shorten-url" component={ShortenUrlPage} />
          <Route exact path="/analytics" component={AnalyticsPage} />
          <Route exact path="/user-urls" component={UserUrlsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
