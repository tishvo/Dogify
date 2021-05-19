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
        this.componentDidMount = this.componentDidMount.bind(this);
        this.moreDogsClick = this.moreDogsClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
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

    handleKeyPress(e) {
        if (e.key === 'Enter') {
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

    }

    render() {
        return (
            <div>
            <div className="landing">
                <p className="title">Dogify<span className="subtitle">Dog adoption</span></p>
                <div className="quote">"Dogs are our link to paradise."</div>
                <div className="subtitle author">- Milan Kundera</div>
                </div>
            <div className="sectionTwo">
                <p className="sectionTwo_main">Adopting is one of the best things you can do.</p>
                <p className="sectionTwo_sub">Give a deserving dog a forever home today.</p>
            </div>
            <div className="meet">Meet our doggos!</div>
            <div className="mainDogs">Search by zipcode: <input type="text" value={this.state.zipcode} onChange={this.onZipcodeChange} onKeyPress={this.handleKeyPress}/></div>
            <div className="mainDogs"><div className="more" onClick={this.moreDogsClick}>See more doggos</div></div>
            <div className="mainDogs"><Dogs dogs={this.state.dogs}/></div>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));