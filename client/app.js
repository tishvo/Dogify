import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello!</div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('app'));