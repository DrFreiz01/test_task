import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from "./Context";
import Block from "./Block";

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null
        };
    }

    dragOverHandler(e) {
        e.preventDefault()
        return undefined;
    }

    dropHandler(e, item) {
        this.setState({current: item})
        console.log(this.state.current)
    }

    render() {
        let value = this.context;
        console.log(this.state.current)

        let result;
        if (this.state.current) {
            console.log(this.state.current.email)
            result = <p>{this.state.current.email}</p>
        }

        return (
        <div className="col-6">

            <div className="border-1 rounded border h-100 pb-2"
                 draggable={true}
                 onDragOver={e => this.dragOverHandler(e)}
                 onDrop={e => this.dropHandler(e, value.currentCard)}>
                {result}
            </div>

        </div>
    )
        ;
    }
}

Favorites.contextType = MainContext;
