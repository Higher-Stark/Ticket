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
            attributes: ["Username", "Email", "Password"],
            users: [["xtq", "xtq@sjtu.edu.cn", "xtq@password"],
                ["pzy", "pzy@sjtu.edu.cn", "pzy@password"],
                ["qpz", "qpz@sjtu.edu.cn", "qpz@password"],
                ["ybh", "ybh@sjtu.edu.cn", "ybh@password"]],
        }
    }

    componentWillMount() {
        this.setState({
            verifyUrl : this.verification.verifyUrl + "find",
            verifyCodes:'find'
        });
    }

    handleChange = name => event => {
        console.log(name);
        this.setState({
            [name]: event.target.value,
        });
        console.log(this.state);
    };


    login = () => {
        /*
            fetch ('login', method: {
                method: 'POST'
                }
         */
        let username = document.getElementById("Username").value;
        if (username.length === 0) {
            alert("Username empty, please input");
            return;
        }
        let password = document.getElementById("Password").value;
        if (password.length === 0) {
            alert("Password empty, please input");
            return;
        }
        for (let user of this.state.users) {
            if (user[0] === username && user[2] === password) {
                alert("Log in successfully");
                /*document.getElementById('not').style.display='none';
                document.getElementById('login').style.display='block';
                document.getElementById('ticket').style.display='block';*/
                this.props.history.push('/recipereviewcard');
                return;
            }
        }
        alert("Wrong username or password");
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Typography noWrap>Log in</Typography>
                <br/>
                <form className={classes.container} autoComplete='off'>
                <TextField placeholder='User Name' id='Username' name='name'
                           value={this.state.name} label='User name'
                           className={classes.textField}
                           margin='normal'
                           required
                           onChange={this.handleChange('name')}/>
                    <br/>
                <TextField placeholder='Password' id='Password' name='password'
                           value={this.state.password} label='Password'
                           className={classes.textField}
                           margin='normal'
                           type='password'
                           required
                           onChange={this.handleChange('password')}/>
                    <br/>
                <TextField id='AuthCode' name='authCode'
                           value={this.state.authCode} label='Verification Code'
                           className={classes.textField}
                           margin='normal'
                           onChange={this.handleChange('authCode')}/>
                    <img src={this.state.verifyUrl}
                         alt=""
                         onClick={() => this.setState({verifyUrl: this.state.verifyUrl + "3"})}
                         className={classes.verifyImg}/>
                    <br/>
                <Button color='primary' onClick={this.login}>Log in</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(Login);