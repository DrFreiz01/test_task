import React from 'react';
import {MainContext} from "./Context";

export default class Block extends React.Component {

    dragStartHandler = (e) => {
        console.log(this);
        this.context.updateData(this.props.item);
    }

    dragOther = (e) => {
        e.preventDefault()
        return undefined;
    }

    render() {
        const {updateData} = this.context;
        const {item} = this.props;

        return (

            <div key={this.props.index} className="UserListBG border-1 rounded me-2 px-3 py-2 border d-flex"
                 style={{cursor: 'grab'}}
                 draggable={true}
                 onMouseDown={this.dragStartHandler}
                 onDragLeave={this.dragOther}
                 onDragEnd={this.dragOther}
            >
                <div className="w-25">
                    <img className="img-fluid rounded-circle" src={item.picture.medium} alt=""/>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-content-center w-75">
                    <div className="d-flex">
                        <p className="p-0 m-0 px-2">{item.name.first}</p>
                        <p className="p-0 m-0 px-2">{item.name.last}</p>
                        <p className="p-0 m-0 px-2">{item.registered.date.split('T')[0].split('-').reverse().join(".")}</p>
                    </div>
                    <div>
                        <p className="p-0 m-0 px-2">{item.email}</p>
                    </div>
                </div>
            </div>
        )
    }
}

Block.contextType = MainContext;