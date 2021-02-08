import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  BrowserHistory,
  Link,
} from "react-router-dom";
import UserDetails from "../src/screens/UserDetails";
import AddUser from "../src/screens/AddUser";
import store from "../src/store";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import {
  Navbar,
  NavbarText,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
const history = createHashHistory();

class App extends Component {
  state = {
    location: window.location.pathname,
    pageTitle: "User Details",
  };

  componentDidMount = () => {
    this.unlisten = history.listen((location, action) => {
      if (window.location.pathname == "/userdetails") {
        this.setState({ pageTitle: "User Details" });
      }
      if (window.location.pathname == "/adduser") {
        this.setState({ pageTitle: "Add/ Edit User" });
      }
    });

    if (
      window.location.pathname == "/userdetails" ||
      window.location.pathname == "/userdetails/"
    ) {
      this.setState({ pageTitle: "User Details" });
    }
    if (
      window.location.pathname == "/adduser" ||
      window.location.pathname == "/adduser/"
    ) {
      this.setState({ pageTitle: "Add/ Edit User" });
    }
  };
  onUserDetailClick = () => {
    this.setState({ pageTitle: "User Details" });
  };
  onAddUserClick = () => {
    this.setState({ pageTitle: "Add/ Edit User " });
  };

  render() {
    return (
      <Provider store={store} history={history}>
        <Router>
          <Navbar light expand="md" className="navBarStyle">
            <Nav className="" navbar>
              <NavItem>
                <Link
                  to="/userdetails"
                  className="nav-item mr-2"
                  onClick={this.onUserDetailClick}
                >
                  UserDetails
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/adduser"
                  className="nav-item mr-2"
                  onClick={this.onAddUserClick}
                >
                  Add/ Edit
                </Link>
              </NavItem>
            </Nav>
            <NavbarText className="navBarText">
              {this.state.pageTitle}
            </NavbarText>
          </Navbar>
          <div>
            <Route exact path="/" component={UserDetails}></Route>
            <Route exact path="/userdetails" component={UserDetails}></Route>
            <Route exact path="/adduser" component={AddUser}></Route>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
