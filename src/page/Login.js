import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
        width: '90%',
    },
    verifyImg: {
        width: '27%',
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
        verifyUrl: 'http://120.79.58.85:30001/Code/Generate',
        uuid: ''
    };
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
        test = test && (this.state.password.match(/\D/) !== null);
        return test;
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
        if(!this.check_name()){
            alert("Wrong username format");
            return;
        }
       if(!this.check_pwd()){
            alert("Wrong password format");
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
                if (text === "code"){
                    alert("验证码错误");
                    this.changeVerifyImg();
                    return;
                }
                else if (text === "fail") {
                    alert("用户名或密码错误");
                    this.changeVerifyImg();
                    return;
                }
                else if (text === "UnActive") {
                    alert("邮箱未激活");
                    this.changeVerifyImg();
                    return;
                }
                else
                {
                    alert("登录成功");
                }
                let date = new Date();
                let utcTime = date.toUTCString();
                let currentUser = {
                    name: name,
                    time: utcTime,
                    token: text,
                };
                this.props.toggleLogin(currentUser);
                let storage = window.localStorage;
                storage.setItem("user", JSON.stringify(currentUser));
                this.props.history.push('/');
                return;
            })
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

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Typography noWrap className={classes.header} align='center' color='primary' variant='display2'>Log in</Typography>
                        <form className={classes.container} autoComplete='off'>
                            <TextField placeholder='User Name' id='Username' name='name'
                                value={this.state.name} label='User name'
                                className={classes.textField}
                                margin='normal'
                                required
                                onChange={this.handleChange('name')} />
                            <TextField placeholder='Password' id='Password' name='password'
                                value={this.state.password} label='Password'
                                className={classes.textField}
                                margin='normal'
                                type='password'
                                required
                                onChange={this.handleChange('password')} />
                            <TextField id='AuthCode' name='authCode'
                                value={this.state.authCode} label='Verification Code'
                                className={classes.authInput}
                                margin='normal'
                                onChange={this.handleChange('authCode')} />
                            <img src={this.state.verifyUrl}
                                alt=""
                                onClick={this.changeVerifyImg}
                                className={classes.verifyImg} />
                            <Button color='primary' onClick={this.login} className={classes.button} variant='contained'>Log in</Button>
                        </form>
                        <div>
                            <Typography variant='body1' align='center' noWrap style={{color: "#FF6699"}} className={classes.reminder}>
                                Don't have an account? <NavLink to='/signup'>Sign up</NavLink>
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);