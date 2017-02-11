import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import emailValidator from 'email-validator';
import {extend} from 'lodash/object';

class UserDetails extends React.Component {

    constructor(props) {
        super();
        this.state = extend(this.state, props.userDetails);
    }

    state = {
        name: '',
        email: ''
    }

    handleNameChange = (event) => {
        const name = event.target.value;
        this.setState(extend(this.state, {name}), this.update);
    }

    handleEmailChange = (event) => {
        const email = event.target.value;
        this.setState(extend(this.state, {email}), this.update);
    }

    isNameValid() {
        return this.state.name !== '';
    }

    isEmailValid() {
        return emailValidator.validate(this.state.email);
    }

    update() {
        this.props.updateUserDetails(this.state);
        this.props.validCallback(this.isNameValid() && this.isEmailValid());
    }

    isValid() {
        return this.state.valid;
    }

    render() {
        return (
            <div>
                <TextField
                    floatingLabelText="Full name"
                    onChange={this.handleNameChange}
                    defaultValue={this.props.userDetails.name}
                    errorText={this.isNameValid() ? '' : 'Please enter your name'}
                    fullWidth />
                <br />
                <TextField
                    floatingLabelText="Email"
                    defaultValue={this.props.userDetails.email}
                    onChange={this.handleEmailChange}
                    errorText={this.isEmailValid() ? '' : 'Please enter a valid email address'}
                    fullWidth />
                <br />
            </div>
        );
    }
}

UserDetails.propTypes = {
    validCallback: PropTypes.func.isRequired,
    userDetails: PropTypes.object,
    updateUserDetails: PropTypes.func.isRequired
};

export default UserDetails;
