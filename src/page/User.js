import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {urlEncode} from "../util/utils";

const styles = theme => ({
    root: {
        // display: 'flex',
        width: 'inherit',
        padding: theme.spacing.unit,
    },
    padding: {
        padding: theme.spacing.unit,
    },
    imageSec: {
        display: 'flex',
        width: '100%',
        // height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        margin: 'auto auto',
        borderRadius: '50%',
    },
    textField: {
        display: 'inline-block',
        maxWidth: '300px',
    },
    input : {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    actions : {
        display: 'block',
        justifyContent: 'right',
    },
    action: {
        //flexGrow: 1,
        display: 'block',
        //margin: '0 auto',
        float: 'right',
    },
    label:{
        display: 'inline-block',
        paddingRight: theme.spacing.unit,
    },
    block: {
        display: 'block',
        margin: `${theme.spacing.unit * 3}px 0`,
    },
    imgGrid: {
        marginTop: theme.spacing.unit * 3,
        flexGrow: 1,
    },
    info: {
        display: 'inline-block',
    },
});

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            edit: false,
            tab: 0,
            newImg: null,
        };
    };

    componentWillMount() {
        let storage = window.localStorage;
        let user = storage.getItem("user") || null;
        // user = user === null ? Users[0] : user;
        user = {
            name: 'Invinsible',
            password: 'incredible',
            image: 'https://image.flaticon.com/icons/svg/25/25231.svg',
            intro: 'For Asgard!',
            nickname: 'menhera',
            email: 'aco@aoc.com',
            phone: 1000100,
        };
        this.setState({ user });
    };

    handleChange = name => event => {
        console.log(name);
        console.log(event.target.value);
        const {user} = this.state;
        user[name] = event.target.value;
        this.setState({ user });
    };

    toggleEdit = () => {
        this.setState({
            edit: true,
        });
    };

    toggleSave = () => {
        this.setState({
            edit: false,
        });
        /*
        const url = "/update/profile";
        fetch (url, {
            method: "GET",
            body: urlEncode(this.state.user),
        })
            .then(response => {
                if (response.status === 200) alert("Update profile succeeded");
                else alert("Update profile failed");
            })
        */
    };

    toggleTab = (event, value) => {
        this.setState({
            tab: value,
        });
    };

    setImg = event => {
        let newImg = event.target.files[0];
        if (typeof FileReader === "undefined") {
            alert("Your Browser doesn't support FileReader, Please upgrade your browser. Latest Google Chrome is recommended.");
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(newImg);
        let that = this;
        reader.onload = function(e) {
            const {user} = that.state;
            user.image = this.result;
            that.setState({user});
        }
    };

    render() {
        const {classes} = this.props;
        const {tab, user, edit} = this.state;
        let keys = Object.keys(user);
        let idx = keys.indexOf("image");
        keys.splice(idx, 1);
        idx = keys.indexOf("password");
        keys.splice(idx, 1);

        const infoItem = (key, value) => edit ? (
            <div className={classes.block} key={key}>
                <Typography variant='title' className={classes.label}>{key}{': '}</Typography>
                <TextField key={key} value={value} onChange={this.handleChange(key)} className={classes.textField}
                           id={key} name={key} margin="normal" type="text" required
                />
            </div>
        ) : (
            <div className={classes.block} key={key}>
                <Typography variant='title' className={classes.label} color='primary'>{key}{': '}</Typography>
                <Typography className={classes.info} variant="subheading" component="h3" color="default">{value}</Typography>
            </div>
        );

        const info = (
            <div>
                <Grid container spacing={24}>
                        <Grid item xs={2} className={classes.imgGrid}>
                            <div className={classes.imageSec}>
                                <img alt={user.name} src={user.image} className={classes.image}/>
                            </div>
                            <div>
                                <input accept="image/*" className={classes.input} id="flat-button-file" type="file" onChange={this.setImg}/>
                                <label htmlFor="flat-button-file">
                                    <Button component="span" variant="contained" className={classes.button}>
                                        Upload Profile
                                    </Button>
                                </label>

                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div className={classes.actions}>
                                {
                                    edit ?
                                        <Button variant='fab' color='primary' onClick={this.toggleSave} className={classNames(classes.action, classes.button)}>
                                            <SaveIcon/>
                                        </Button> :
                                        <Button variant='fab' color='primary' onClick={this.toggleEdit} className={classNames(classes.action, classes.button)}>
                                            <EditIcon/>
                                        </Button>
                                }
                            </div>
                            <div className={classes.padding}>
                                {
                                    keys.map(s => (
                                        infoItem(s, user[s])
                                    ))
                                }
                            </div>
                        </Grid>
                </Grid>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position='static'>
                <Tabs value={tab} onChange={this.toggleTab}>
                    <Tab label="User info"/>
                    <Tab label="Modify Password"/>
                    <Tab label="Address Management"/>
                </Tabs>
                </AppBar>
                { tab === 0 && info }
                { tab === 1 && <Typography variant='headline' component='h2' color="primary" >Change Password</Typography> }
                { tab === 2 && <Typography variant='headline' component='h2' color="primary">Address Management</Typography> }
            </div>
        )
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);