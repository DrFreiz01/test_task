import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from "./Context";

export default class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    dragStartHandler(e, item, updateData) {
        updateData(item)
    }

    dragEndHandler(e) {
        e.preventDefault()
        return undefined;
    }

    render() {
        let value = this.context;
        return (

            <div key={this.props.index} className="main__block border-3 rounded m-2 px-3 py-2 border d-flex"
                 draggable={true}

                 onMouseDown={e => this.dragStartHandler(e, this.props.item, value.updateData)}
                 // onDragStart={e => this.dragStartHandler(e, this.props.item, value.updateData)}
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
        )
    }
}

Block.contextType = MainContext;