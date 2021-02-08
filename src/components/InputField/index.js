import React, { Component } from "react";
import { Form, Label, FormGroup, Input, Spinner } from "reactstrap";

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
    };
  }

  handleChange = (event, name) => {
    this.props &&
      this.props.handleChange &&
      this.props.handleChange(event.target.value, name);
  };

  render() {
    const {
      type,
      name,
      id,
      placeholder,
      size,
      value,
      label,
      maxLength,
    } = this.props;
    return (
      <Form>
        <FormGroup>
          <Label for={id}>{label}</Label>
          <Input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={(e) => this.handleChange(e, name)}
            icon="primary"
            size={size}
            value={value ? value : ""}
            maxLength={maxLength}
          ></Input>
        </FormGroup>
      </Form>
    );
  }
}
