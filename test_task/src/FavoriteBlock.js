import React from 'react';
import {MainContext} from "./Context";

export default class FavoriteBlock extends React.Component {
    render() {
        const { removeFavoriteCards } = this.context;
        const {item} = this.props;

        return (
            <div className="UserListBG border-1 rounded my-2 px-3 py-2 border d-flex justify-content-around align-items-center">
                <div className="w-25">
                    <img className="img-fluid rounded-circle" src={item.item.picture.medium} alt=""/>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-content-center w-75">
                    <div className="d-flex">
                        <p className="p-0 m-0 px-2">{item.item.name.first}</p>
                        <p className="p-0 m-0 px-2">{item.item.name.last}</p>
                        <p className="p-0 m-0 px-2">{item.item.registered.date.split('T')[0].split('-').reverse().join(".")}</p>
                    </div>
                    <div>
                        <p className="p-0 m-0 px-2">{item.item.email}</p>
                    </div>
                </div>
                <div onClick={() => removeFavoriteCards(item.item.login.uuid)}>
                    <img style={{width: '20px'}} src="/remove.png" alt=""/>
                </div>
            </div>
        )
    }
}

FavoriteBlock.contextType = MainContext;