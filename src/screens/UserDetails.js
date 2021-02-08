import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { setUserDetails } from "../action";
import { connect } from "react-redux";
// import 'bootstrap/dist/css/bootstrap.min.css';

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetails: (userData) => {
      console.log("dipatch....");
      dispatch(setUserDetails(userData));
    },
  };
};

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      indexValue: "",
      data: null,
    };
  }
  componentDidMount = () => {
    this.props.history.listen(() => {
      //this.props.changeTitle(window.location.pathname)
    });

    if (this.props && this.props.userData && this.props.userData.userDetails) {
      this.setState({ userDetails: this.props.userData.userDetails });
    }
  };
  addButtonClick = () => {
    this.props.history.push("/adduser");
  };
  onEditIconClick = (index, data) => {
    this.props.history.push({
      pathname: `/adduser`,
      state: { indexValue: index, data: data },
    });
  };
  onDeleteIconClick = (index) => {
    let userDetails = this.props.userData.userDetails;
    userDetails.splice(index, 1, 0);
    // this.setState({ userDetails: temp });
    this.props.setUserDetails(userDetails);
    this.setState({ userDetails: this.props.userData.userDetails });
  };
  render() {
    let { userDetails } = this.state;
    // console.log("user details in state.." + JSON.stringify(userDetails));

    return (
      <div>
        <div className="mt-5 mb-5">
          <Table bordered>
            <thead>
              <tr>
                <th>Display Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userDetails &&
                userDetails.length > 0 &&
                userDetails.map((data, index) => {
                  return (
                    <tr>
                      <th scope="row">{data.displayName}</th>
                      <td>{data.age}</td>
                      <td>{data.gender}</td>
                      <td>{data.address}</td>
                      <td>{data.email}</td>
                      <td>
                        <i
                          className="fa fa-edit cursor-pointer "
                          onClick={() => this.onEditIconClick(index, data)}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="fa fa-trash cursor-pointer "
                          onClick={() => this.onDeleteIconClick(index)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          <div className="d-flex row justify-content-center mt-5">
            <Button color="primary" onClick={this.addButtonClick}>
              ADD
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (globalState) => {
  return {
    userData: globalState.userDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
