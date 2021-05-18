import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dogs from './Dogs.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: [],
            page: 1,
            zipcode: ''
        }
        this.onZipcodeChange = this.onZipcodeChange.bind(this);
        this.searchZipcode = this.searchZipcode.bind(this);
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

    render() {
        return (
            <div>
            <div>Name of Application Goes Here</div>
            <div>Search by zipcode: <input type="text" value={this.state.zipcode} onChange={this.onZipcodeChange}/><button onClick={this.searchZipcode}>Search</button></div>
            <div><Dogs dogs={this.state.dogs}/></div>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));