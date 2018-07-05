import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 360,
        // alignItems: 'center',
    },
    menu: {
        width: 360,
    },
    verifyImg: {
        width: '15%',
        height: '9%',
    }
});

class Signup extends Component{
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
            verifyUrl : this.verification.verifyUrl + "find"
        });
    }

    handleChange = name => event => {
        console.log(name);
        this.setState({
            [name]: event.target.value,
        });
        console.log(this.state);
    };

    check_name = () => {
        let pattern = /^[\w-]{5, 25}$/;
        return this.state.name.match(pattern);
    };

    check_pwd = () => {
        let pattern = /^[\w-$%#]{6, 25}$/;
        return this.state.password.match(pattern);
    };

    verify = () => {
        return this.state.verifyCodes === this.state.authCode;
    };

    login = () => {
        /*
            fetch ('login', method: {
                method: 'POST'
                }
         */
        if (this.check_name() && this.check_pwd() && this.verify()) {
            alert("Sign up succeed");
        }
        else (alert("Sign up failed"));
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography noWrap>Sign up</Typography>
                <br/>
                <form className={classes.container} autoComplete='off'>
                <TextField placeholder='User Name' id='name' name='name'
                           value={this.state.name} label='User name'
                           className={classes.textField}
                           margin='normal'
                           required
                           onChange={this.handleChange('name')}/>
                    <br/>
                <TextField placeholder='Password' id='password' name='password'
                           value={this.state.password} label='Password'
                           className={classes.textField}
                           margin='normal'
                           type='password'
                           required
                           onChange={this.handleChange('password')}/>
                    <br/>
                <TextField placeholder='Email Address' id='email' name='email'
                           value={this.state.email} label='Email'
                           className={classes.textField}
                           margin='normal'
                           type='email'
                           required
                           onChange={this.handleChange('email')}/>
                    <br/>
                <TextField id='authCode' name='authCode'
                           value={this.state.authCode} label='Verification Code'
                           className={classes.textField}
                           margin='normal'
                           onChange={this.handleChange('authCode')}/>
                    <img src={this.state.verifyUrl}
                         onClick={() => this.setState({verifyUrl: this.state.verifyUrl + "3"})}
                         className={classes.verifyImg}/>
                    <br/>
                <Button color='primary' onClick={this.login}>Sign Up</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(Signup);