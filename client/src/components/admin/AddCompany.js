import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addCompany } from "../../actions/index";

class AddCompany extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = ` ${touched && error ? "text-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
        className="form-control"
          placeholder={field.placeholder}
          name={field.name}
          type={field.type}
          {...field.input}
        />

        {touched ? error : ""}
      </div>
    );
  }

  onSubmit(values) {
    this.props.addCompany(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className= " mx-auto" style={{width: "400px", marginTop: "8%"}}>
        <h3>Add New Company</h3>
        <form
          
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >


         
            <Field
              placeholder="Enter Name"
              name="name"
              type="name"
              component={this.renderField}
            />
           
         
          
            <Field
              placeholder="Enter Email"
              name="email"
              type="email"
              component={this.renderField}
            />
        
               <button  type="submit" className="btn btn-primary">
            Save
          </button>
          <Link style={{margin: "0.5rem"}} to="/dashboard" className="btn btn-danger"  >
            Cancel
          </Link>
       
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Enter a name please";
  }

  if (!values.email) {
    errors.email = "Enter Email please";
  }
  return errors;
};

export default reduxForm({
  validate,
  form: "addNewCompany"
})(connect(null, { addCompany })(AddCompany));
