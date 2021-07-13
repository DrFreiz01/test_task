import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from "./Context";
import Lists from "./Lists";

export default class FavoriteBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        let value = this.context;
        const imgStyle = {
            width: '20px'
        }
        let marker = "elem";
        return (
            <div key={this.props.item.index} id={marker + this.props.item.index}  className="main__block border-3 rounded my-2 px-3 py-2 border d-flex justify-content-around align-items-center">
                <div className="w-25">
                    <img className="img-fluid rounded-circle" src={this.props.item.item.picture.medium} alt=""/>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-content-center w-75">
                    <div className="d-flex">
                        <p className="p-0 m-0 px-2">{this.props.item.item.name.first}</p>
                        <p className="p-0 m-0 px-2">{this.props.item.item.name.last}</p>
                        <p className="p-0 m-0 px-2">{this.props.item.item.registered.date.split('T')[0].split('-').reverse().join(".")}</p>
                    </div>
                    <div>
                        <p className="p-0 m-0 px-2">{this.props.item.item.email}</p>
                    </div>
                </div>
                <div onClick={() => value.removeFavoriteCards(this.props.item.item.login.uuid)}>
                    <img style={imgStyle} src="/remove.png" alt=""/>
                </div>
            </div>
        )
    }
}

FavoriteBlock.contextType = MainContext;