import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dogs from './Dogs.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: []
        }
    }

    componentDidMount() {
        axios.get(`/dogs`)
        .then((response) => {
            console.log(response.data.animals)
            this.setState({
                dogs: response.data.animals
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
            <div>Hello!</div>
            <div><Dogs dogs={this.state.dogs}/></div>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));