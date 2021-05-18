import React from 'react';
import ReactDOM from 'react-dom';

class Dog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onPictureClick = this.onPictureClick.bind(this);
    }

    componentDidMount() {
        
    }

    onPictureClick() {
        let url = this.props.item.url;
        window.open(url);
    }

    render() {
        if(!this.props.item.description) {
            this.props.item.description = 'This doggo does not have a description but we can assume they are bestest and should be adopted';
        }
        if (this.props.item.photos.length === 0) {
            let photo = this.props.item.photos; //empty array
            photo[0] = {};
            photo[0].medium = './library/placeholder.jpg';
        }
        return (
            <div>
                <img src={this.props.item.photos[0].medium} onClick={this.onPictureClick}/>
                <div>{this.props.item.name}</div>
                <div>{this.props.item.description}</div>
            </div>
        );
    }

}

export default Dog;