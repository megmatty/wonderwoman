import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { add } from '../actions/auth';
import { testFetch } from '../actions/protected-data';
import { sendEntry } from '../actions/addNew';
// import {required, nonEmpty} from '../validators';

export class Add extends React.Component {

    componentDidMount() {
       // this.props.dispatch(testFetch());
    }


    onSubmit(values) {
        let submission = {
            journal: values.journal,
            mood: values.mood,
            activity: values.activity
        };
        console.log(submission);
        return this.props.dispatch(sendEntry(submission));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <br />
                
                <p>Welcome back, {this.props.email}</p>

                <p>Mood</p>
                <label>
                    <Field name="mood" component="input" type="radio" value="happy" />
                    {' '}
                    happy
                </label>
                  <label>
                    <Field name="mood" component="input" type="radio" value="nervous" />
                    {' '}
                    nervous
                  </label>

                  <p>Activity</p>
                <label>
                    <Field name="activity" component="input" type="radio" value="work" />
                    {' '}
                    work
                </label>
                  <label>
                    <Field name="activity" component="input" type="radio" value="video games" />
                    {' '}
                    video games
                  </label>
                  <br />
                  <br />
                  <label htmlFor="journal">Journal</label>
                  <br />
                    <Field name="journal" component="textarea" type="textarea" />
                <br />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : ''
    };
};

Add = connect(
    mapStateToProps
    )(Add);

export default reduxForm({
    form: 'add',
    onSubmitFail: (errors, dispatch) => dispatch(focus('add', 'email'))
})(Add);






