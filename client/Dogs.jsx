import React from 'react';
import ReactDOM from 'react-dom';
import Dog from './Dog.jsx';

class Dogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        
    }



    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                {this.props.dogs.map((item, index) => 

                <Dog key={index} item={item}/>
            
                )}
            </div>
        );
    }

}

export default Dogs;