import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Dogs from './Dogs.jsx';
import ReactModal from 'react-modal';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all: [],
            dogs: [],
            zipcode: '',
            signup: false,
            login: false,
            signup_username: '',
            signup_password: '',
            login_username: '',
            login_password: ''
        }
        
        this.onZipcodeChange = this.onZipcodeChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.moreDogsClick = this.moreDogsClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleOpenModal1 = this.handleOpenModal1.bind(this);
        this.handleCloseModal1 = this.handleCloseModal1.bind(this);
        this.handleOpenModal2 = this.handleOpenModal2.bind(this);
        this.handleCloseModal2 = this.handleCloseModal2.bind(this);
        this.onSignupUsernameChange = this.onSignupUsernameChange.bind(this);
        this.onSignupPasswordChange = this.onSignupPasswordChange.bind(this);
        this.onLoginUsernameChange = this.onLoginUsernameChange.bind(this);
        this.onLoginPasswordChange = this.onLoginPasswordChange.bind(this);
    }

    componentDidMount() {
        axios.get(`/dogs`)
        .then((response) => {
            var all = response.data.animals;
            var filter = [];
            for (var i = 0; i < all.length; i++) {
                var current = all[i];
                if (current.photos.length !== 0) {
                    filter.push(current);
                }
            }
            this.setState({
                all: filter,
                dogs: filter.slice(0,9)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onSignupUsernameChange(e) {
        this.setState({
            signup_username: e.target.value
        })
    }

    onSignupPasswordChange(e) {
        this.setState({
            signup_password: e.target.value
        })
    }

    onLoginUsernameChange(e) {
        this.setState({
            login_username: e.target.value
        })
    }

    onLoginPasswordChange(e) {
        this.setState({
            login_password: e.target.value
        })
    }


    onZipcodeChange(e) {
        this.setState({
            zipcode: e.target.value
        })
    }


    moreDogsClick() {
        let allDogs = this.state.all;
        let nextDogs = allDogs.slice(9);
        this.setState({
            dogs: nextDogs
        })
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            let zipcode = this.state.zipcode;
            axios.get(`/dogs/${zipcode}`)
            .then((response) => {
                var all = response.data.animals;
                var filter = [];
                for (var i = 0; i < all.length; i++) {
                    var current = all[i];
                    if (current.photos.length !== 0) {
                        filter.push(current);
                    }
                }
                this.setState({
                    dogs: filter
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }

    handleOpenModal1() {
        this.setState({
            signup: true
        })
    }

    handleCloseModal1() {
        this.setState({
            signup: false
        })
        var login = {
            user: this.state.signup_username,
            pass: this.state.signup_password
        }
        axios.post('/signup', login)
        .then((res) => {
            window.alert(res.data);
        })
    }

    handleOpenModal2() {
        this.setState({
            login: true
        })
    }

    handleCloseModal2() {
        this.setState({
            login: false
        })
        var login = {
            user: this.state.login_username,
            pass: this.state.login_password
        }
        axios.post('/login', login)
        .then((res) => {
            window.alert(res.data);
        })
    }

    render() {
        return (
            <div>
            <div className="landing">
                <button className="sign-up" onClick={this.handleOpenModal1}>Sign Up</button> <button className="login" onClick={this.handleOpenModal2}>Login</button>
                <ReactModal
                    isOpen={this.state.signup}
                    contentLabel="sign up modal"
                    className="modal1"
                    >
                        <p className="modal_header">Sign Up</p>
                        <form onSubmit={this.handleCloseModal1}>
                        <div className="modal_field">Username: <input type="email" value={this.state.signup_username} onChange={this.onSignupUsernameChange} required/></div>
                        <div className="modal_field">Password: <input type="password" name="password" value={this.state.signup_password} onChange={this.onSignupPasswordChange} required/></div>
                        <div className="modal_button_div"><input type="submit" className="modal_button" value="Signup" /></div></form>
                    </ReactModal>
                <ReactModal
                    isOpen={this.state.login}
                    contentLabel="login modal"
                    className="modal2"
                    >
                        <p className="modal_header">Login</p>
                        <form onSubmit={this.handleCloseModal2}>
                        <div className="modal_field">Username: <input type="email" value={this.state.login_username} onChange={this.onLoginUsernameChange} required/></div>
                        <div className="modal_field">Password: <input type="password" name="password" value={this.state.login_password} onChange={this.onLoginPasswordChange} required/></div>
                        <div className="modal_button_div"><input type="submit" className="modal_button" value="Login" /></div></form>
                    </ReactModal>
                <p className="title">Dogify<span className="subtitle">Dog adoption</span></p>
                <div className="quote">"Dogs are our link to paradise."</div>
                <div className="subtitle author">- Milan Kundera</div>
                </div>
            <div className="sectionTwo">
                <p className="sectionTwo_main">Adopting is one of the best things you can do.</p>
                <p className="sectionTwo_sub">Give a deserving dog a forever home today.</p>
            </div>
            <div className="meet">Meet our doggos!</div>
            <div className="meet-sub">(Click on a picture to learn more)</div>
            <div className="mainDogs">Search by zipcode: <input type="text" value={this.state.zipcode} onChange={this.onZipcodeChange} onKeyPress={this.handleKeyPress}/></div>
            <div className="mainDogs"><div className="more" onClick={this.moreDogsClick}>See more doggos</div></div>
            <div className="mainDogs"><Dogs dogs={this.state.dogs}/></div>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));