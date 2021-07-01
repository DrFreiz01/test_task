import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from "./Context";
import Block from "./Block";
import FavoriteBlock from "./FavoriteBlock";

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: null,
            allCards: null
        };
    }

    dragStartHandler(e) {
        e.preventDefault()
    }

    dragEndHandler(e) {
        e.preventDefault()
    }

    dragOverHandler(e) {
        e.preventDefault()
        return undefined;
    }

    dropHandler(e, item, updateFavoriteCards) {
        console.log(item)
        updateFavoriteCards(item)
    }

    render() {
        let value = this.context;
        let result = [];
        return (



        <div className="col-6 ">

            {value.allCards.map((item, index) => {
                result.push(<FavoriteBlock item={{item, index}}/>)
            })}

            <div className="border-1 rounded border h-100 p-2"
                 draggable={true}
                 onDragStart={e => this.dragStartHandler(e)}
                 onDragLeave={e => this.dragEndHandler(e)}
                 onDragOver={e => this.dragOverHandler(e)}
                 onDrop={e => this.dropHandler(e, value.currentCard, value.updateFavoriteCards)}>
                {result}
            </div>
        </div>
    )
    }
}

Favorites.contextType = MainContext;