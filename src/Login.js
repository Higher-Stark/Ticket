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
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        marginTop : theme.spacing.unit,
        alignItems: 'center',
        margin: 'auto',
    },
    content2: {
        margin: '0 auto',
        width: 510,
    },
    header : {
        marginBottom: theme.spacing.unit * 2,
    },
    reminder: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Login extends Component{
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
        }
    }

    componentWillMount() {
        this.setState({
            verifyUrl : this.verification.verifyUrl + "find",
            verifyCodes:'find'
        });
        console.log(this.props);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    login = () => {
        /*
            fetch ('login', method: {
                method: 'POST'
                }
         */
        let username = this.state.name;
        if (username.length === 0) {
            alert("Username empty, please input");
            return;
        }
        let password = this.state.password;
        if (password.length === 0) {
            alert("Password empty, please input");
            return;
        }
        for (let user of User) {
            if (user.name === username && user.password === password) {
                alert("Log in successfully");
                let date = new Date();
                let utcDate = date.toUTCString();
                let currentUser = {
                    name: user.name,
                    time: utcDate,
                }
                this.props.toggleLogin(currentUser);
                this.props.history.push('/homepage');
                return;
            }
        }
        alert("Wrong username or password");
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.content2}>
                <Typography noWrap className={classes.header} align='center' color='primary' variant='display2'>Log in</Typography>
                <form className={classes.container} autoComplete='off'>
                    <TextField placeholder='User Name' id='Username' name='name'
                               value={this.state.name} label='User name'
                               className={classes.textField}
                               margin='normal'
                               required
                               onChange={this.handleChange('name')}/>
                    <TextField placeholder='Password' id='Password' name='password'
                               value={this.state.password} label='Password'
                               className={classes.textField}
                               margin='normal'
                               type='password'
                               required
                               onChange={this.handleChange('password')}/>
                    <TextField id='AuthCode' name='authCode'
                               value={this.state.authCode} label='Verification Code'
                               className={classes.authInput}
                               margin='normal'
                               onChange={this.handleChange('authCode')}/>
                    <img src={this.state.verifyUrl}
                         alt=""
                         onClick={() => this.setState({verifyUrl: this.state.verifyUrl + "3"})}
                         className={classes.verifyImg}/>
                    <div className="g-recaptcha" data-sitekey="6LfLkmIUAAAAAO7cmo5x0KgCBtjobIK7M9RzA5Fl"></div>
                    <Button color='primary' onClick={this.login} className={classes.button} variant='contained'>Log in</Button>
                </form>
                <div>
                    <Typography variant='body1' align='center' noWrap color='secondary' className={classes.reminder}>
                        Don't have an account? <a href='signup'>Sign up</a>
                    </Typography>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);