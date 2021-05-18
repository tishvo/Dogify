import React from 'react';
import ReactDOM from 'react-dom';

class Dog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.props.item.photos)
        
    }

    render() {
        if(!this.props.item.description) {
            this.props.item.description = 'This doggo does not have a description but we can assume they are bestest and should be adopted';
        }
        if (this.props.item.photos.length === 0) {
            let photo = this.props.item.photos; //empty array
            photo[0] = {};
            photo[0].medium = './placeholder.jpg';
        }
        return (
            <div>
                <img src={this.props.item.photos[0].medium}/>
                <div>{this.props.item.name}</div>
                <div>{this.props.item.description}</div>
            </div>
        );
    }

}

export default Dog;