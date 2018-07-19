import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';

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
    root: {
        margin: '0 auto',
        maxWidth: 510,
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
        verifyUrl: 'http://120.79.58.85:30001/Code/Generate',
        uuid: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            authCode: '',
            verifyUrl: '',
            formError: false,
        }
    }

    componentWillMount() {
        this.changeVerifyImg();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    changeVerifyImg = () => {
        let date = new Date();
        this.setState({
            verifyUrl : this.verification.verifyUrl + `?timestamp=${date.toUTCString()}`,
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


    signup = () => {
        const {name, password, email, authCode} = this.state;
        if (name.length === 0) {
            alert("用户名不能为空");
            return;
        }
        if (password.length === 0) {
            alert("密码不能为空");
            return;
        }
        if (email.length === 0) {
            alert("邮箱不能为空");
            return;
        }
        if (authCode.length === 0) {
            alert("验证码不能为空");
            return;
        }
        if (this.check_name() && this.check_pwd() && this.check_email()) {
            fetch ('http://120.79.58.85:30004/Sign/Up', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: `username=${name}&password=${password}&email=${email}&answer=${authCode}`,
                credentials: "include",
            })
                .then(response => response.text())
                .then(text => {
                    if (text === "success") {
                        alert("注册成功,我们已向您的邮箱发送了一封激活邮件,请查收");
                        this.props.history.push('/activating');
                        return;
                    }
                    else if (text === "code") {
                        alert("验证码错误");
                    } else if (text === "resend") {
                        alert("尚未激活，已经重新发送邮件");
                        this.props.history.push('/activating');
                        return;
                    } else if (text === 'exited') {
                        alert("用户名已经存在");
                    } else if (text === "fail") {
                        alert("注册失败，未知错误");
                    }
                    this.changeVerifyImg();
                });
        }
        else if(!this.check_name()){
            alert("Wrong username format");
        }
        else if(!this.check_pwd()){
            alert("Wrong password format");
        }
        else if(!this.check_email()){
            alert("Wrong email format");
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
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
                         onClick={this.changeVerifyImg}
                         className={classes.verifyImg}/>
                    <Button color='primary' onClick={this.signup} className={classes.button} variant='contained'>
                        Sign Up
                    </Button>
                </form>
                <div>
                    <Typography variant='body1' align='center' noWrap color='secondary' className={classes.reminder}>
                        Already have an account? <NavLink to='/signin'>Sign in</NavLink>
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