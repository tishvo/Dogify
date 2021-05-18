import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dogs from './Dogs.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: [],
            page: 2,
            zipcode: ''
        }
        this.onZipcodeChange = this.onZipcodeChange.bind(this);
        this.searchZipcode = this.searchZipcode.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.moreDogsClick = this.moreDogsClick.bind(this);
    }

    componentDidMount() {
        axios.get(`/dogs`)
        .then((response) => {
            //console.log(response.data.animals)
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

    onZipcodeChange(e) {
        this.setState({
            zipcode: e.target.value
        })
    }

    searchZipcode(e) {
        let zipcode = this.state.zipcode;
        axios.get(`/dogs/${zipcode}`)
        .then((response) => {
            //console.log(response.data.animals)
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

    moreDogsClick() {
        axios.get(`/moredogs/${this.state.page}`)
        .then((response) => {
            //console.log(response.data.animals)
            var all = response.data.animals;
            var filter = [];
            for (var i = 0; i < all.length; i++) {
                var current = all[i];
                if (current.photos.length !== 0) {
                    filter.push(current);
                }
            }
            this.setState({
                dogs: filter,
                page: this.state.page + 1
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
            <div className="landing">
                <p className="title">Dogify<span className="subtitle">Dog adoption</span></p>
                <div className="quote">"Dogs are our link to paradise."</div>
                <div className="subtitle author">- Milan Kundera</div>
                
                </div>
            <div className="mainDogs">Search by zipcode: <input type="text" value={this.state.zipcode} onChange={this.onZipcodeChange}/><button onClick={this.searchZipcode}>Search</button></div>
            <div className="mainDogs"><button onClick={this.moreDogsClick}>See more doggos</button></div>
            <div className="mainDogs"><Dogs dogs={this.state.dogs}/></div>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));