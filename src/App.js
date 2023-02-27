import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { routeList } from "./config/routeList";
import SiteList from "./components/SiteList";
import { MobileMenu } from "./MobileMenu";
import { Hamburger } from "./Hamburger";
import Home from "./Home";
import {
  ContentWrapper,
  Content,
  Header,
  LeftMenu,
} from "./styles/components/styled";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <MobileMenu />
        <Header className="App-header">
          <h2>Developer Links</h2>
          <Hamburger />
        </Header>
        <ContentWrapper>
          <LeftMenu>
            <ul>
              {routeList.map((item) => {
                const { path, text } = item;
                return (
                  <li key={path}>
                    <NavLink to={path}>{text}</NavLink>
                  </li>
                );
              })}
            </ul>
          </LeftMenu>

          <Switch>
            {routeList.map((item) => {
              const { path, importList } = item;
              return (
                <Route path={`/${path}`} key={path}>
                  {importList ? (
                    <Content>
                      <SiteList list={importList} video={path === "youtube"} />
                    </Content>
                  ) : (
                    <Content>
                      <Home />
                    </Content>
                  )}
                </Route>
              );
            })}

            <Route path="/index.html" key="home">
              <Content>
                <Home />
              </Content>
            </Route>
          </Switch>
        </ContentWrapper>
      </div>
    </Router>
  );
}

export default App;
