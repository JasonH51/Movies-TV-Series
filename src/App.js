import {Container} from '@material-ui/core';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import SimpleBottomNavigation from './components/Footer/footer';
import Header from './components/Header/header';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Trending from './pages/Trending/Trending';
import Search from './pages/Search/Search';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Container>
            <Switch>
              <Route path="/" component={Trending} exact />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </Switch>
          </Container>
          <SimpleBottomNavigation />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
