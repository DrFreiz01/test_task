import React from 'react';
import {MainContext} from "./Context";
import FavoriteBlock from "./FavoriteBlock";

export default class Favorites extends React.Component {
    dragOther = (e) => {
        e.preventDefault()
        return undefined;
    }

    dropHandler = (e, item, updateFavoriteCards) => {
        this.context.updateFavoriteCards(this.context.currentCard)
    }

    render() {
        const { allCards } = this.context;
        const result = [];
        return (
            <div className="col-6 h-100">
                {allCards.map((item, index) => {
                    result.push(<FavoriteBlock key={item.login.uuid} item={{item, index}}/>)
                })}

                <div className="border-1 rounded border h-100 p-3 overflow-auto"
                     draggable={true}
                     onDragStart={this.dragOther}
                     onDragLeave={this.dragOther}
                     onDragOver={this.dragOther}
                     onDrop={this.dropHandler}
                >
                    <div className="d-flex justify-content-center align-items-center border border-1 rounded" style={{height: '5%'}}>
                        <span className="fs-5 text-center">Избранное</span>
                    </div>
                    {result}
                </div>
            </div>
        )
    }
}

Favorites.contextType = MainContext;
