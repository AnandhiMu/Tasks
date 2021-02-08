import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import {
  Row,
  Col,
  Label,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import "./style.css";
import { setUserDetails } from "../action";
import { connect } from "react-redux";
import store from "../store";

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetails: (userData) => {
      console.log("dipatch....");
      dispatch(setUserDetails(userData));
    },
  };
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      age: "",
      address: "",
      email: "",
      userData: [],
      indexValue: "",
      errorMessage: "",
      userData: [
        {
          displayName: "testuser 1",
          age: "22",
          gender: "Male",
          email: "testuser1@gmail.com",
          address: "test user address 1",
        },
        {
          displayName: "testuser 2",
          age: "32",
          gender: "Male",
          email: "testuser2@gmail.com",
          address: "test user address 2",
        },
        {
          displayName: "testuser 3",
          age: "33",
          gender: "Male",
          email: "testuser3@gmail.com",
          address: "test user address 3",
        },
      ],
      options: [
        {
          value: "M",
          gender: "Male",
        },
        {
          value: "F",
          gender: "Female",
        },
        {
          value: "T",
          gender: "Transgender",
        },
      ],
      dropdownOpen: false,
      gender: "Male",
    };
  }
  handleChange = (value, name) => {
    if (name == "displayname") {
      if (value && /^[a-zA-Z]+$/.test(value) === false) {
        return;
      } else {
        this.setState({ displayName: value });
      }
    }
    if (name == "age") {
      if (value && (value.length > 2 || value == 0 || value > 95)) {
        return;
      } else {
        this.setState({ age: value });
      }
    }
    if (name == "address") {
      this.setState({ address: value });
    }
    if (name == "email") {
      this.setState({ email: value, errorMessage: "" });
    }
  };

  onAddButtonClick = () => {
    var {
      displayName,
      email,
      age,
      address,
      userData,
      indexValue,
      gender,
    } = this.state;
    let temp = [...this.state.userData];

    let res = /^[a-zA-Z]+$/.test(displayName);
    console.log("result.." + res);

    var returnVal = false;
    if (email) {
      returnVal = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(
        email
      );
    }
    if (returnVal) {
      if (indexValue || indexValue == "0") {
        temp[indexValue].displayName = displayName;
        temp[indexValue].email = email;
        temp[indexValue].age = age;
        temp[indexValue].address = address;
        temp[indexValue].gender = gender;
      } else {
        let userObj = {
          displayName: displayName,
          age: age,
          email: email,
          address: address,
          gender: gender,
        };
        temp.push(userObj);
      }

      this.setState({
        userData: temp,
        displayName: "",
        age: "",
        email: "",
        address: "",
        errorMessage: "",
        gender: "Male",
      });
      this.props.setUserDetails(temp);
    } else {
      this.setState({ errorMessage: "Enter valid email" });
    }
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  dropdownItemClick = (value) => {
    this.setState({ gender: value });
  };
  componentDidMount = () => {
    // console.log("window.location.pathname..." + window.location.pathname);
    this.props.setUserDetails(this.state.userData);

    this.setState({ userData: this.props.userData.userDetails });

    if (
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state &&
      this.props.location.state.data
    ) {
      let data = this.props.location.state.data;
      let displayName = data.displayName;
      let age = data.age;
      let email = data.email;
      let address = data.address;
      let gender = data.gender;
      this.setState({
        displayName: displayName,
        email: email,
        address: address,
        age: age,
        gender: gender,
        indexValue: this.props.location.state.indexValue,
      });
    }
  };
  render() {
    let {
      displayName,
      age,
      email,
      address,
      userData,
      errorMessage,
      dropdownOpen,
      options,
      gender,
    } = this.state;
    //console.log("userData..." + JSON.stringify(userData));

    return (
      <div className="addUsermainDiv">
        {/* Add User */}
        <Row className="mt-5">
          <Col xs="12" sm="6" md="6" lg="6">
            <InputField
              type="text"
              name="displayname"
              id="displayname"
              placeholder="Enter Display Name"
              onChange={this.handleChange}
              value={displayName ? displayName : ""}
              handleChange={this.handleChange}
              label="Display Name"
              maxLength="25"
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="6" lg="6">
            <InputField
              type="number"
              name="age"
              id="age"
              placeholder="Enter Age between 1 to 95"
              onChange={this.handleChange}
              value={age ? age : ""}
              handleChange={this.handleChange}
              label="Age"
              maxLength="2"
            />
          </Col>
        </Row>
        <Row className="ml-0">
          <Label for="gender">Gender</Label>
        </Row>
        <Row className="ml-0 mb-4">
          <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{gender}</DropdownToggle>
            <DropdownMenu>
              {options &&
                options.map((data) => {
                  return (
                    <DropdownItem
                      onClick={() => this.dropdownItemClick(data.gender)}
                    >
                      {data.gender}
                    </DropdownItem>
                  );
                })}
            </DropdownMenu>
          </Dropdown>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="6" lg="6">
            <InputField
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              onChange={this.handleChange}
              value={address ? address : ""}
              handleChange={this.handleChange}
              label="Address"
              maxLength="100"
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="6" lg="6">
            <InputField
              type="text"
              name="email"
              id="email"
              placeholder="Enter Email"
              onChange={this.handleChange}
              value={email ? email : ""}
              handleChange={this.handleChange}
              label="Email"
              maxLength="100"
            />
          </Col>
        </Row>
        <div style={{ color: "red" }}>{errorMessage}</div>

        <Row className="mt-5">
          <Col xs="4" sm="3" md="3" lg="6">
            <Col xs="12" className="d-flex justify-content-center">
              <Button color="primary" onClick={this.onAddButtonClick}>
                SAVE{" "}
              </Button>{" "}
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (globalState) => {
  return {
    userData: globalState.userDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
