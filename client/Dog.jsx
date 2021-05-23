import React from 'react';
import ReactDOM from 'react-dom';

class Dog extends React.Component {
    constructor(props) {
        super(props);
        this.onPictureClick = this.onPictureClick.bind(this);
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
            let photo = this.props.item.photos; 
            photo[0] = {};
            photo[0].medium = './library/placeholder.jpg';
        }
        return (
            <div className="dog">
                <img className="image" src={this.props.item.photos[0].medium} onClick={this.onPictureClick}/>
                <div className="name">{this.props.item.name}</div>
                <div className="description">{this.props.item.description}</div>
            </div>
        );
    }

}

export default Dog;