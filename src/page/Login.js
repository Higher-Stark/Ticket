import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

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
    root: {
        margin: '0 auto',
        maxWidth: 510,
        padding: `0 ${theme.spacing.unit}px`
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
        prepareVerify: 'http://120.79.58.85:30001/Code/Prepare/',
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

    login = () => {
        const {name, password, authCode} = this.state;
        if (name.length === 0) {
            alert("用户名不能为空");
            return;
        }
        if (password.length === 0) {
            alert("密码不能为空");
            return;
        }
        if (authCode.length === 0) {
            alert("验证码不能为空");
            return;
        }
        let s = `username=${name}&password=${password}&answer=${authCode}`;
        fetch('http://120.79.58.85:30004/Sign/In', {
            method: 'POST',
            body: s,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            credentials: "include",
        })
            .then(response => {
                if (response.status !== 200) throw Error("Error !" + response);
                return response.text();
            })
            .then(text => {
                /*
                if (text === "success") {
                    let date = new Date();
                    let utcTime = date.toUTCString();
                    let currentUser = {
                        name: name,
                        time: utcTime,
                    };
                    this.props.toggleLogin(currentUser);
                    this.props.history.push('/');
                    return;
                }
                */
                if (text === "code"){
                    alert("验证码错误");
                    return;
                }
                else if (text === "fail") {
                    alert("密码错误");
                    return;
                }
                let date = new Date();
                let utcTime = date.toUTCString();
                let currentUser = {
                    name: name,
                    time: utcTime,
                };
                this.props.toggleLogin(currentUser);
                this.props.history.push('/homepage');
                return;
            })
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
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
                         onClick={this.changeVerifyImg}
                         className={classes.verifyImg}/>
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