import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './Input';
import Select from './Select';

class Form extends Component {
  // default state if child doesn't have one
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // validate a specific field
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    console.log(data);
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    // we cannot have errors as null
    this.setState({ errors: errors || {} });
    if (errors) return;
    //const username = this.username.current.value;
    // console.log('submit', username);

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className='btn btn-primary'>
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        className='form-control'
        name={name}
        onChange={this.handleChange}
        label={label}
        value={data[name]}
        options={options}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  // render() {
  //   return (  );
  // }
}

export default Form;
