import React from 'react';
import ReactDOM from 'react-dom';

export default class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: null
        };
    }

    dragStartHandler(e, item) {
        console.log(item)
        this.setState(this.currentCard = item)
    }

    dragEndHandler(e) {
        return undefined;
    }



    render(div = <>
        <div key={this.props.index} className="main__block border-3 rounded my-2 px-3 py-2 border d-flex"
             draggable={true}
             onDragStart={e => this.dragStartHandler(e, this.props.item)}
             onDragLeave={e => this.dragEndHandler(e)}
             onDragEnd={e => this.dragEndHandler(e)}


        >
            <div className="w-25">
                <img className="img-fluid rounded-circle" src={this.props.item.picture.medium} alt=""/>
            </div>
            <div className="d-flex flex-column justify-content-evenly align-content-center w-75">
                <div className="d-flex">
                    <p className="p-0 m-0 px-2">{this.props.item.name.first}</p>
                    <p className="p-0 m-0 px-2">{this.props.item.name.last}</p>
                    <p className="p-0 m-0 px-2">{this.props.item.registered.date.split('T')[0].split('-').reverse().join(".")}</p>
                </div>
                <div>
                    <p className="p-0 m-0 px-2">{this.props.item.email}</p>
                </div>
            </div>
        </div>
    </>) {
        return div
    }


}