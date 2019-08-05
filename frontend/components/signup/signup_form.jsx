import React from "react";
import { merge } from "lodash";
import generate_random_key from "../../util/app_util";
import ErrorBubble from "./error_bubble";
import { connect } from "react-redux";
import { createNewUser, login } from "../../actions/session_actions";


//regex taken from stackoverflow
let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const NAME_ERROR = "What's your name?";
const PASSWORD_ERROR =
  "Enter a combination of at least six numbers, " +
  "letters and punctuation marks (like ! and &)";
const EMAIL_ERROR =
  "You'll use this when you log in " +
  "and if you ever need to reset your password";

const PRONOUN_ERROR = "Please select your pronoun"

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.currentDay = new Date().getDate() + 1;
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      pronoun: "",
      gender: "",
      day: this.currentDay,
      month: this.currentMonth,
      year: 1994,
      formErrors: {
        first_name: {
          message: "",
          visible: false
        },
        last_name: {
          message: "",
          visible: false
        },
        email: {
          message: "",
          visible: false
        },
        password: {
          message: "",
          visible: false
        },
        pronoun: {
          message: "",
          visible: false
        }
      },
      customGenderForm: false
    };
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this)
    this.setUpDays();
    this.setUpMonths();
    this.setUpYears();
  }

  setUpDays() {
    this.dayOptions = [];
    for (let day = 1; day <= 31; day++) {
      this.dayOptions.push(
        <option key={generate_random_key()} selected={day === this.currentDay}>
          {day}
        </option>
      );
    }
  }

  setUpMonths() {
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.monthOptions = [];
    for (let month = 1; month <= 12; month++) {
      this.monthOptions.push(
        <option
          key={generate_random_key()}
          selected={month === this.currentMonth}
        >
          {MONTHS[month - 1]}
        </option>
      );
    }
  }

  setUpYears() {
    this.yearOptions = [];
    for (let year = 1905; year <= this.currentYear; year++) {
      this.yearOptions.push(
        <option
          key={generate_random_key()}
          value={year}
          selected={year === 1994}
        >
          {year}
        </option>
      );
    }
  }

  handleBlur(e) {
    const value = e.target.value.trim();
    const field = e.target.name;
    this.validateField(field, value);
  }

  handleChange(e) {
    const value = e.target.value.trim();
    const field = e.currentTarget.name;
    this.setState({ [field]: value });
  }

  handleRadioClick(e) {
    const value = e.target.value;
    if (value === "custom") {
      this.setState({ customGenderForm: true });
    } else {
      const pronoun = value === "male" ? "he" : "she";
      this.setState(
        merge({}, this.state, {
          gender: value,
          pronoun,
          customGenderForm: false
        })
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createNewUser } = this.props;

    if (this.validateAllFields()) {
      const { day, month, year } = this.state;
      const dob = `${month}-${day}-${year}`;
      createNewUser(merge({}, this.state, { dob }));
    }
  }

  handleFocus(e) {
    const field = e.target.name;
    if (this.hasError(field)) this.toggleOnErrorVisibility(field);
  }

  toggleOnErrorVisibility(field) {
    this.setState(
      merge({}, this.state, {
        formErrors: {
          [field]: {
            visible: true
          }
        }
      })
    );
  }

  validateField(fieldName, value) {
    switch (fieldName) {
      case "first_name":
        if (!value) {
          this.setErrorMessage("first_name", NAME_ERROR);
        } else {
          this.emptyErrorMessage("first_name");
        }

        break;
      case "last_name":
        if (!value) {
          this.setErrorMessage("last_name", NAME_ERROR);
        } else {
          this.emptyErrorMessage("last_name");
        }
        break;
      case "email":
        if (!emailRegex.test(value)) {
          this.setErrorMessage("email", EMAIL_ERROR);
        } else {
          this.emptyErrorMessage("email");
        }
        break;
      case "password":
        if (!passwordRegex.test(value)) {
          this.setErrorMessage("password", PASSWORD_ERROR);
        } else {
          this.emptyErrorMessage("password");
        }
        break;
      case "pronoun":
        if (!value) {
          this.setErrorMessage("pronoun", PRONOUN_ERROR);
        } else {
          this.emptyErrorMessage("pronoun");
        }
        break;
    }
  }

  validateAllFields() {
    const { first_name, last_name, email, password, pronoun } = this.state;
    const formErrors = merge({}, this.state.formErrors);
    let allValid = true;
    if (!first_name) {
      allValid = false;
      formErrors.first_name.message = NAME_ERROR;
    }
    if (!last_name) {
      allValid = false;
      formErrors.last_name.message = NAME_ERROR;
    }
    if (!emailRegex.test(email)) {
      allValid = false;
      formErrors.email.message = EMAIL_ERROR;
    }
    if (!passwordRegex.test(password)) {
      allValid = false;
      formErrors.password.message = PASSWORD_ERROR;
    }
    if (!pronoun) {
      allValid = false;
      formErrors.pronoun.message = PRONOUN_ERROR;
    }
    const newState = merge({}, this.state, { formErrors });
    this.setState(newState);
    return allValid;
  }

  setErrorMessage(field, message) {
    this.setState(
      merge({}, this.state, {
        formErrors: {
          [field]: {
            message,
            visible: false
          }
        }
      })
    );
  }

  emptyErrorMessage(field) {
    this.setState(
      merge({}, this.state, {
        formErrors: {
          [field]: {
            message: "",
            visible: false
          }
        }
      })
    );
  }

  getErrorMessage(field) {
    let {
      formErrors: {
        [field]: { message }
      }
    } = this.state;
    return message;
  }

  hasError(field) {
    return this.getErrorMessage(field) ? "input-error" : "";
  }

  isErrorVisible(field) {
    let {
      formErrors: {
        [field]: { visible }
      }
    } = this.state;
    return visible;
  }

  displayCustomGenderForm() {
    let display = null;
    const { customGenderForm } = this.state;
    if (customGenderForm) {
      display = (
        <div className="custom-gender-form">
          <div
            className={
              `${
                this.isErrorVisible("pronoun")
                  ? ""
                  : `${this.hasError("pronoun")}`
              } custom-gender-div`
            }
          >
            <select
              className="pronoun-input"
              name="pronoun"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            >
              <option value="" default>
                Select your pronoun
              </option>
              <option value="he">She: wish her a happy birthday</option>
              <option value="she">he: wish him a happy birthday</option>
              <option value="they">
                Them: wish them a happy birthday
              </option>
            </select>

            <span className="pronoun-description">
              Your pronoun is visible to everyone.
            </span>

            {this.isErrorVisible("pronoun") ? (
              <ErrorBubble
                className="pronoun-error-bubble"
                message={this.getErrorMessage("pronoun")}
              />
            ) : null}
          </div>
          <input
            className="custom-gender-input"
            type="text"
            placeholder="Enter your gender (optional)"
            name="gender"
          />
        </div>
      );
    }
    return display;
  }

  demoLogin(e) {
    e.preventDefault();
    const {loginUser} = this.props
    const demoUser = { email: "flamingo@gmail.com", password: "Abc123456@"}
    loginUser(demoUser)
  }

  render() {
    return (
      <form className="sign-up-form" onSubmit={this.handleSubmit}>
        <span className="form-label">Sign Up</span>
        <span className="form-description">It's quick and easy.</span>
        <div
          className={
            `${
              this.isErrorVisible("first_name")
                ? ""
                : `${this.hasError("first_name")}`
            } first-name-div`
          }
        >
          <input
            className="first-name-input"
            type="text"
            name="first_name"
            value={this.state.first_name}
            placeholder="First name"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {this.isErrorVisible("first_name") ? (
            <ErrorBubble
              className="first-name-error-bubble"
              message={this.getErrorMessage("first_name")}
            />
          ) : null}
        </div>

        <div
          className={
            `${
              this.isErrorVisible("last_name")
                ? ""
                : `${this.hasError("last_name")}`
            } last-name-div`
          }
        >
          <input
            className="last-name-input"
            type="text"
            name="last_name"
            value={this.state.last_name}
            placeholder="Last name"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {this.isErrorVisible("last_name") ? (
            <ErrorBubble
              className="last-name-error-bubble"
              message={this.getErrorMessage("last_name")}
            />
          ) : null}
        </div>

        <div
          className={
            `${
              this.isErrorVisible("email")
                ? ""
                : `${this.hasError("email")}`
            } email-div`
          }
        >
          <input
            className="email-input"
            type="text"
            name="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {this.isErrorVisible("email") ? (
            <ErrorBubble
              className="email-error-bubble"
              message={this.getErrorMessage("email")}
            />
          ) : null}
        </div>

        <div
          className={
            `${
              this.isErrorVisible("password")
                ? ""
              : `${this.hasError("password")}` 
            } password-div`
          }
        >
          <input
            className="password-input"
            type="password"
            name="password"
            value={this.state.password}
            placeholder="New password"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {this.isErrorVisible("password") ? (
            <ErrorBubble
              className="password-error-bubble"
              message={this.getErrorMessage("password")}
            />
          ) : null}
        </div>

        <div className="birthday-form">
          <div className="birthday-form-label">Birthday</div>
          <select
            name="day"
            onChange={this.handleChange}
            className="day-input"
          >
            {this.dayOptions}
          </select>
          <select
            name="month"
            onChange={this.handleChange}
            className="month-input"
          >
            {this.monthOptions}
          </select>
          <select
            name="year"
            onChange={this.handleChange}
            className="year-input"
          >
            {this.yearOptions}
          </select>
        </div>
        <div className="gender-form">
          <div className="gender-form-label">Gender </div>
          <span className="gender-input">
            <input
              type="radio"
              name="gender"
              value="male"
              onClick={this.handleRadioClick}
            />
            Male
          </span>
          <span className="gender-input">
            <input
              type="radio"
              name="gender"
              value="female"
              onClick={this.handleRadioClick}
            />
            Female
          </span>
          <span className="gender-input ">
            <input
              type="radio"
              name="gender"
              value="custom"
              onClick={this.handleRadioClick}
            />
            Custom
          </span>
          {this.displayCustomGenderForm()}
        </div>
        <button className="sign-up-button" type="submit">
          Sign Up
        </button>

        <button
          className="demo-login-button"
          type="submit"
          onClick={this.demoLogin}
        >
          Demo Login
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewUser: user => dispatch(createNewUser(user)),
    loginUser: user => dispatch(login(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignupForm);
