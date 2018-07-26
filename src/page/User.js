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
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Provinces from '../data/provinces';
import {decomposeAddr, composeAddr, getDistricts, getCities, chinese, urlEncode} from "../util/utils";

const styles = theme => ({
    root: {
        width: 'inherit',
    },
    padding: {
        padding: theme.spacing.unit,
    },
    imageSec: {
        display: 'flex',
        width: '100%',
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
        maxWidth: 540,
        minWidth: 160,
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    actions: {
        display: 'block',
        justifyContent: 'right',
    },
    action: {
        display: 'block',
        float: 'right',
    },
    label: {
        display: 'inline-block',
        paddingRight: theme.spacing.unit,
    },
    block: {
        display: 'block',
        margin: `${theme.spacing.unit * 2}px 0`,
    },
    imgGrid: {
        marginTop: theme.spacing.unit * 3,
        flexGrow: 1,
    },
    inline: {
        display: 'inline-block',
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'inherit',
        justifyContent: 'center',
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: `0 ${theme.spacing.unit}ps`,
        minWidth: 160,
    },
    updateButton: {
        flexGrow: 1,
        maxWidth: 100,
        margin: `${theme.spacing.unit}px auto`,
    },
    form: {
        display: 'block',
        width: '36%',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
        justifyContent: 'center',
    },
    password: {
        display: 'block',
        margin: theme.spacing.unit,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
});

class User extends Component {
    serviceUrl = 'http://pipipan.cn:30009';
    oldInfo = null;

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                avatar: '',
                nickName: '',
                email: '',
                phone: 0,
                account: 0,
                address: "",
            },
            edit: false,
            tab: 0,
            newImg: null,
            oldPwd: null,
            newPwd: null,
            renewPwd: null,
            provinces: Provinces,
            cities: null,
            districts: null,
        };
    };

    componentWillMount() {
        this.fetchInfo();
    };

    updateUserInfo = name => event => {
        const {user} = this.state;
        user[name] = event.target.value;
        this.setState({user});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    toggleEdit = () => {
        this.oldInfo = Object.assign({}, this.state.user);
        const detailAddr = decomposeAddr(this.state.user.address);
        let cities = null;
        let districts = null;
        console.log(detailAddr);
        if (detailAddr.province) cities = getCities(detailAddr.province);
        if (detailAddr.city) districts = getDistricts(detailAddr.province, detailAddr.city);
        this.setState({
            edit: true,
            cities: cities,
            districts: districts,
        });
    };

    toggleSave = () => {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        this.setState({
            edit: false,
        });

        const {phone, nickName, address, account} = this.state.user;

        let body = {
            token: token,
            phone: phone,
            nickname: nickName,
            address: address,
            account: account
        };

        fetch(`${this.serviceUrl}/UserDetail/UpdateByUserid`, {
            method: 'POST',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: urlEncode(body),
        }).then(response => {
            let headers = response.headers;
            console.log(headers.get("errornum"));
            switch (headers.get("errornum")) {
                case '0' :
                    return response.json();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '2' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(data => {
                this.setState({user: data});
            })
            .catch(e => {
                alert(e.message);
                window.location.href = "/signin";
            })
    };

    toggleCancel = () => {
        this.setState({
            user: this.oldInfo,
            edit: false,
        });
    };

    toggleTab = (event, value) => {
        this.setState({
            tab: value,
        });
    };

    setImg = event => {
        let newImg = event.target.files[0]; //File
        if (newImg.name.indexOf('.svg') > -1) {
            alert('Sorry, we do not accept images in svg format');
            return;
        }
        if (typeof FileReader === "undefined") {
            alert("Your Browser doesn't support FileReader, Please upgrade your browser. Latest Google Chrome is recommended.");
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(newImg);
        let that = this;
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        reader.onload = function (e) {
            const {user} = that.state;
            user.avatar = this.result;  //base 64 string
            that.setState({user});
        };
        let formData = new FormData();
        formData.append("avatar", newImg);
        formData.append("token", token);
        fetch(`${that.serviceUrl}/UserDetail/UpdateByUserid`, {
            method: 'POST',
            credentials: "include",
            body: formData,
        }).then(response => {
            let headers = response.headers;
            switch (headers.get("errornum")) {
                case '0' :
                    return response.json();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '2' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(data => {
                that.setState({user: data});
            })
            .catch(e => {
                alert(e.message);
                window.location.href = "/signin";
            })

    };

    fetchInfo = () => {
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        fetch(`${this.serviceUrl}/UserDetail/QueryByUserid?token=${token}`, {
            method: 'GET',
            credentials: "include",
        }).then(response => {
            let headers = response.headers;
            switch (headers.get("errornum")) {
                case '0' :
                    return response.json();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '2' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(data => {
                this.setState({user: data});
            })
            .catch(e => {
                if (e instanceof SyntaxError) {
                    fetch(`${this.serviceUrl}/UserDetail/InitialSave?token=${token}`).then(()=>{this.fetchInfo()});
                }
                else {
                    alert(e.message);
                    window.location.href = "/signin";
                }
            })
    };


    check_pwd = (password) => {
        let pattern = /^[\w-$%#]{6,25}$/;
        let test = pattern.test(password);
        test = test && (password.match(/\d/) !== null);
        test = test && (password.match(/\w/) !== null);
        return test;
    };

    modifyPwd = () => {
        const {oldPwd, newPwd, renewPwd} = this.state;
        if (oldPwd.length === 0) {
            alert("旧密码不能为空");
            return;
        }
        if (newPwd.length === 0) {
            alert("新密码不能为空");
            return;
        }
        if (renewPwd.length === 0) {
            alert("请再次输入新密码");
            return;
        }
        if(!this.check_pwd(oldPwd)){
            alert("旧密码格式错误");
            return;
        }
        if(!this.check_pwd(newPwd)){
            alert("新密码格式错误");
            return;
        }
        if (newPwd !== renewPwd) {
            alert("两次输入的新密码不一致");
            return;
        }
        let storage = window.localStorage;
        let user = storage.getItem("user");
        user = JSON.parse(user);
        let token = user === null ? '' : user.token;
        fetch(`${this.serviceUrl}/UserDetail/UpdateOldPassword?token=${token}&oldpassword=${oldPwd}&newpassword=${newPwd}`, {
            method: 'GET',
        }).then(response => {
            let headers = response.headers;
            console.log(headers.get("errornum"));
            switch (headers.get("errornum")) {
                case '0' :
                    return response.text();
                case '1' : {
                    throw Error("You haven't signed in yet.");
                }
                case '2' :
                    throw Error("You identity match!");
                case '3' :
                    throw Error("Your account is frozen!");
                default:
                    throw Error("Unexpected response received from server! Please try again later.");
            }
        })
            .then(text => {
                    if (text === "false") {
                        alert('Wrong old password!');
                    }
                    else {
                        alert("success!");
                        fetch(`http://pipipan.cn:30004/Sign/Out?token=${token}`, {
                            method: 'POST',
                            credentials: "include",
                        })
                            .then(response => response.status)
                            .then(status => {
                                if (status === 200) {
                                    storage.removeItem("user");
                                    this.setState({user: {
                                            username: '',
                                            avatar: '',
                                            nickName: '',
                                            email: '',
                                            phone: 0,
                                            account: 0,
                                            address: "",
                                        }});
                                }
                                else throw Error("Connection failed");
                            })
                            .then(()=>{window.location.href = "/signin";})
                            .catch(e => console.log(e));
                    }
                }
            )
            .catch(e => {
                alert(e.message);
                window.location.href = "/signin";
            });
    };

    filterKeys = (keys) => {
        let filter = ["avatar", "id", "username",  "email", 'address'];
        filter.forEach(s => {
            let idx = keys.indexOf(s);
            keys.splice(idx, 1);
        });
        return keys;
    };

    changeAddress = name => event => {
        let value = event.target.value;
        if (name === 'province') {
            const cities = getCities(value);
            const detailAddr = {
                province: value,
                city: null,
                district: null,
                detail: null,
            };
            const addr = composeAddr(detailAddr);
            const {user} = this.state;
            user.address = addr;
            this.setState({
                user: user,
                cities: cities,
                districts: null,
            })
        }
        else if (name === 'city') {
            const {user} = this.state;
            let detailAddr = decomposeAddr(user.address);
            detailAddr.city = value;
            detailAddr.district = null;
            detailAddr.detail = null;
            console.log(detailAddr);
            const districts = getDistricts(detailAddr.province, detailAddr.city);
            user.address = composeAddr(detailAddr);
            this.setState({
                user: user,
                districts: districts,
            })
        }
        else if (name === 'district') {
            const {user} = this.state;
            let detailAddr = decomposeAddr(user.address);
            detailAddr.district = value;
            detailAddr.detail = null;
            user.address = composeAddr(detailAddr);
            this.setState({user});
        }
        else if (name === 'detail') {
            const {user} = this.state;
            let detailAddr = decomposeAddr(user.address);
            detailAddr.detail = value;
            user.address = composeAddr(detailAddr);
            this.setState({user});
        }
        else console.log("unknown name");
    };

    render() {
        const {classes} = this.props;
        const {tab, user, edit} = this.state;
        let keys = Object.keys(user);
        keys = this.filterKeys(keys);

        const infoItem = (key, value) => edit ? (
            <div className={classes.block} key={key}>
                <Typography variant='title' className={classes.label}>{chinese(key)}{': '}</Typography>
                <TextField key={key} value={value} onChange={this.updateUserInfo(key)} className={classes.textField}
                           id={key} name={key} margin="normal" type="text" required
                />
            </div>
        ) : (
            <div className={classes.block} key={key}>
                <Typography variant='title' className={classes.label} color='primary'>{chinese(key)}{': '}</Typography>
                <Typography className={classes.inline} variant="subheading" component="h3"
                            color="default">{value}</Typography>
            </div>
        );

        const {province, city, district, detail} = decomposeAddr(user.address);
        let {provinces, cities, districts} = this.state;
        cities = cities || [];
        districts = districts || [];
        const address = !edit ? (
                <div className={classes.block}>
                    <Typography variant="title" className={classes.label} color="primary">{"地址: "}</Typography>
                    <Typography className={classes.inline} variant="subheading" component="h3"
                                color="default">{user.address}</Typography>
                </div>
            )
            :
            (
                <div className={classNames(classes.block, classes.root)}>
                    <Typography variant='title' className={classes.label}>{'地址: '}</Typography>
                    <div className={classes.block}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="province-select">省/直辖市</InputLabel>
                            <Select value={province || ""} onChange={this.changeAddress('province')}
                                    inputProps={{
                                        name: 'province',
                                        id: 'province-select',
                                    }}
                                    className={classes.textField}
                            >
                                <MenuItem value="" disabled>{"请选择省份"}</MenuItem>
                                {
                                    provinces.map(s => (
                                        <MenuItem value={s.name} key={s.code}>{s.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="city-select">城市</InputLabel>
                            <Select value={city || ""} onChange={this.changeAddress('city')}
                                    inputProps={{
                                        name: 'city',
                                        id: 'city-select',
                                    }}
                                    className={classes.textField}
                            >
                                <MenuItem value="" disabled>{"请选择城市"}</MenuItem>
                                {
                                    cities.map(s => (
                                        <MenuItem value={s} key={s}>{s}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="district-select">区</InputLabel>
                            <Select value={district || ""} onChange={this.changeAddress('district')}
                                    inputProps={{
                                        name: 'district',
                                        id: 'district-select',
                                    }}
                                    className={classes.textField}
                            >
                                <MenuItem value="" disabled>{"请选择区/县"}</MenuItem>
                                {
                                    districts.map(s => (
                                        <MenuItem value={s} key={s}>{s}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField label="具体地址" id="detail" value={detail || ""} key="detail" name="Specific Address"
                                   type='text' margin='normal'
                                   placeholder={"请输入具体地址"}
                                   onChange={this.changeAddress("detail")}
                                   className={classNames(classes.textField, classes.inline, classes.formControl)}
                        />
                    </div>
                </div>
            );

        const info = (
            <div>
                <Paper elevation={10} className={classes.paper}>
                    <Grid container spacing={24}>
                        <Grid item xs={2} className={classes.imgGrid}>
                            <div className={classes.imageSec}>
                                <img alt={user.name} src={user.avatar} className={classes.image}/>
                            </div>
                            <div>
                                <input accept="image/*" className={classes.input} id="flat-button-file" type="file"
                                       onChange={this.setImg}/>
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
                                        <div>
                                            <Button variant='fab' color='secondary' onClick={this.toggleSave}
                                                    className={classNames(classes.action, classes.button)}>
                                                <SaveIcon/>
                                            </Button>
                                            <Button variant='fab' color='primary' onClick={this.toggleCancel}
                                                    className={classNames(classes.action, classes.button)}>
                                                <Cancel/>
                                            </Button>
                                        </div> :
                                        <Button variant='fab' color='primary' onClick={this.toggleEdit}
                                                className={classNames(classes.action, classes.button)}>
                                            <EditIcon/>
                                        </Button>
                                }
                            </div>
                            <div className={classes.padding}>
                                <div className={classes.block} key="username">
                                    <Typography variant='title' className={classes.label}
                                                color='primary'>{"用户名: "}</Typography>
                                    <Typography className={classes.inline} variant="subheading" component="h3"
                                                color="default">{user.username}</Typography>
                                </div>
                                <div className={classes.block} key="email">
                                    <Typography variant='title' className={classes.label}
                                                color='primary'>{"邮箱: "}</Typography>
                                    <Typography className={classes.inline} variant="subheading" component="h3"
                                                color="default">{user.email}</Typography>
                                </div>
                                {
                                    keys.map(s => (
                                        infoItem(s, user[s])
                                    ))
                                }
                                {address}
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );

        const modify = (
            <div className={classes.root}>
                <Paper elevation={10} className={classes.paper}>
                    <div className={classes.form}>
                        <Typography variant='headline' component='h2' color="primary" align='center'>修改密码</Typography>
                        <TextField label="原密码" value={this.state.oldPwd || ""}
                                   name="Old Password"
                                   placeholder="原密码"
                                   onChange={this.handleChange("oldPwd")}
                                   className={classNames(classes.textField, classes.password)}
                                   id="oldPwd" margin='normal' type='password' required fullWidth
                        />
                        <TextField label="新密码" value={this.state.newPwd || ""}
                                   name="New Password"
                                   placeholder="新密码"
                                   onChange={this.handleChange("newPwd")}
                                   className={classNames(classes.textField, classes.password)}
                                   id="newPwd" margin='normal' type='password' required fullWidth
                        />
                        <TextField label="确认新密码" value={this.state.renewPwd || ""}
                                   name="renew Password"
                                   placeholder="原密码"
                                   onChange={this.handleChange("renewPwd")}
                                   className={classNames(classes.textField, classes.password)}
                                   id="renewPwd" margin='normal' type='password' required fullWidth
                        />
                        <div className={classes.wrapper}>
                            <Button variant='contained' color='primary' className={classes.updateButton}
                                    onClick={this.modifyPwd}>
                                {"修改密码"}
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Tabs value={tab} onChange={this.toggleTab}>
                        <Tab label="User info"/>
                        <Tab label="Modify Password"/>
                        <Tab label="修改支付密码"/>
                    </Tabs>
                </AppBar>
                {tab === 0 && info}
                {tab === 1 && modify}
                {tab === 2 && <Typography variant='body1' component='p' gutterBottom>{"此功能尚未开放"}</Typography>}
            </div>
        )
    }
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(User);