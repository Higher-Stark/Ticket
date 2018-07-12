import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {User} from './test-data/user';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 500,
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    verifyImg: {
        width: '30%',
        height: '85%',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    authInput: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '65%',
    },
    button : {
        width : '50%',
        textAlign: 'center',
        padding: '0 auto',
        marginTop : theme.spacing.unit,
        alignItems: 'center',
        margin: 'auto',
    },
    content2: {
        margin: '0 auto',
        width: 510,
        background: 'rgba(255,255,255,0.8)',
        borderRadius: theme.spacing.unit / 2,
        padding: `0 ${theme.spacing.unit}px`,
    },
    header : {
        paddingBottom: theme.spacing.unit ,
    },
    reminder: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SignUp extends Component{
    verification = {
        verifyUrl: 'http://www.7xiwang.com/WebService/ImageValidateCode?code=',
        code: '',
        uuid: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            authCode: '',
            verifyCodes: '',
            formError: false,
        }
    }

    componentWillMount() {
        this.setState({
            verifyUrl : this.verification.verifyUrl + "find",
            verifyCodes:'find'
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    /*
     * check username
     */ 
    check_name = () => {
        let pattern = /^[\w-]{5,25}$/;
        return pattern.test(this.state.name);
    };

    /*
     * Password must contains digits and characters
     */
    check_pwd = () => {
        let pattern = /^[\w-$%#]{6,25}$/;
        let test = pattern.test(this.state.password);
        test = test && (this.state.password.match(/\d/) !== null);
        test = test && (this.state.password.match(/\w/) !== null);
        return test;
    };

    /* 
     * Validate Email layout
     */
    check_email = () => {
        let pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return pattern.test(this.state.email);
    };

    /*
     * Check if the username is already registered
     */
    check_replicate = () => {
        const {name} = this.state;
        for (let i = 0; i !== User.length; i++) {
            if (name === User[i].name) return false;
        }
        return true;
    }

    verify = () => {
        return this.state.verifyCodes === this.state.authCode;
    };

    signup = () => {
        /*
            fetch ('login', method: {
                method: 'POST'
                }
         */
        if (this.check_name() && this.check_pwd() && this.verify() && this.check_replicate() ) {
            alert("Sign up succeed");
            User.push({
                name: this.state.name,
                password: this.state.passive,
                email: this.state.email,
            });
            this.props.history.push('/homepage/signin');
        }
        else {
            console.log(this.check_name());
            console.log(this.check_pwd());
            console.log(this.verify());
            alert("Sign up failed")
        };
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.content2}>
                <Typography noWrap className={classes.header} align='center' color='primary' variant='display2'>Sign up</Typography>
                <form className={classes.container} autoComplete='off'>
                    <TextField placeholder='User Name' id='name' name='name'
                               value={this.state.name} label='User name'
                               className={classes.textField}
                               margin='normal'
                               required
                               onChange={this.handleChange('name')}/>
                    <TextField placeholder='Password' id='password' name='password'
                               value={this.state.password} label='Password'
                               className={classes.textField}
                               margin='normal'
                               type='password'
                               required
                               onChange={this.handleChange('password')}/>
                    <TextField placeholder='Email Address' id='email' name='email'
                               value={this.state.email} label='Email'
                               className={classes.textField}
                               margin='normal'
                               type='email'
                               required
                               onChange={this.handleChange('email')}/>
                    <TextField id='authCode' name='authCode'
                               value={this.state.authCode} label='Verification Code'
                               className={classes.authInput}
                               margin='normal'
                               onChange={this.handleChange('authCode')}/>
                    <img src={this.state.verifyUrl} alt="img"
                         onClick={() => this.setState({verifyUrl: this.state.verifyUrl + "3"})}
                         className={classes.verifyImg}/>
                    <div className="g-recaptcha" data-sitekey="6LfLkmIUAAAAAO7cmo5x0KgCBtjobIK7M9RzA5Fl"></div>
                    <Button color='primary' onClick={this.signup} className={classes.button} variant='contained'>
                        Sign Up
                    </Button>
                </form>
                <div>
                    <Typography variant='body1' align='center' noWrap color='secondary' className={classes.reminder}>
                        Already have an account? <a href='signin'>Sign in</a>
                    </Typography>
                </div>
            </div>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);