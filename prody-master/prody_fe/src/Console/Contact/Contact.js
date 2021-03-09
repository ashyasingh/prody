import React, { Component } from 'react';
import axios from 'axios';
import './Contact.css';
import {CONSTANTS} from '../../utils/constants';

class Contact extends Component {

    state = {
        email: '',
        message: '',
        errorMessage: '',
        showThankYou: false
    };

    submitHandler = () => {

        const contactData = {
            email: this.state.email,
            message: this.state.message
        };

        if(contactData.email === '' || contactData.message === '') {
            this.setState({errorMessage: "Please fill in email and message.", showThankYou: false});
        } else {
            axios.post(`${CONSTANTS.URL_PREFIX}://prody.me/console/contact/submit`, contactData)
             .then(() => {this.setState({showThankYou: true});})
        }
    };

    inputsChangeHandler = (event) => {
        const value = event.target.value;
        this.setState({[event.target.name]: value});
    };


    formContent = () => {
        if(this.state.showThankYou) {
            return (
                <div className="Contact" >
                    <div className="header">Thank you. We will contact you shortly.</div>
                </div>
            );
        } else {
            return (
            <div className="Contact" >
                <div className="header">LET'S TALK</div>
                <div className="form" >
                    <div>EMAIL: *
                        <input className="form-email"
                                type="text"
                                placeholder="Email ..."
                                name="email"
                                value={this.state.email}
                        onChange={this.inputsChangeHandler}/></div>
                    <div>HOW CAN WE HELP? *
                        <textarea className="from-message"
                                   type="text"
                                   rows="10"
                                   placeholder="Message ..."
                                   name="message"
                                   value={this.state.message}
                                   onChange={this.inputsChangeHandler}/></div>
                    <div><input className="form-button" type="submit" onClick={this.submitHandler} value="SEND"/></div>
                    <div className="errorMessage">{this.state.errorMessage}</div>
                </div>
            </div>
        );
        }
    };

    render() {
        return (
        <div>{this.formContent()}</div>
        );
    }
}

export default Contact;