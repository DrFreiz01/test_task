import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Block from "./Block";
import {MainContext} from "./Context";
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let value = this.context;
        let UpTo10 = []
        let UpTo20 = []
        let UpTo30 = []


        {
            value.items.map((item, index) => {
                if (item.registered.age <= 10) {
                    UpTo10.push(item)
                } else if (item.registered.age > 10 && item.registered.age <= 20) {
                    UpTo20.push(item)
                } else if (item.registered.age > 20 && item.registered.age <= 30) {
                    UpTo30.push(item)
                }
            })
        }

        const UpTo10Row = ({index, style}) => (
            <div style={style}>
                <Block item={UpTo10[index]}/>
            </div>
        );

        const UpTo20Row = ({index, style}) => (
            <div style={style}>
                <Block item={UpTo20[index]}/>
            </div>
        );

        const UpTo30Row = ({index, style}) => (
            <div style={style}>
                <Block item={UpTo30[index]}/>
            </div>
        );

        let tabActive = {
            classes: "border rounded-0 list-group-item list-group-item-action"
        }

        return (
            <div className="col-6">
                <div className="row w-100">
                    <div className="col-12">
                        <div className="list-group flex-row" id="list-tab" role="tablist">
                            <a className={UpTo10.length ? tabActive.classes + " active" : tabActive.classes + " disabled"}
                               id="list-home-list"
                               data-bs-toggle="list" href="#list-home" role="tab" aria-controls="home">До 10
                                <span className="badge bg-primary rounded-pill float-end">Нашёл {UpTo10.length}</span>
                            </a>
                            <a className={UpTo20.length ? tabActive.classes : tabActive.classes + " disabled"}
                               id="list-profile-list"
                               data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="profile">От 10 до
                                20
                                <span className="badge bg-primary rounded-pill float-end">Нашёл {UpTo20.length}</span>
                            </a>
                            <a className={UpTo30.length ? tabActive.classes : tabActive.classes + " disabled"}
                               id="list-messages-list"
                               data-bs-toggle="list" href="#list-messages" role="tab"
                               aria-controls="messages">От 20 до 30
                                <span className="badge bg-primary rounded-pill float-end">Нашёл {UpTo30.length}</span>
                            </a>
                        </div>
                    </div>
                    <AutoSizer style={{width: '100%'}}>
                        {() => (
                            <div className="col-12">
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="list-home" role="tabpanel"
                                         aria-labelledby="list-home-list">
                                        <List
                                            className="List"
                                            height={650}
                                            itemCount={UpTo10.length}
                                            itemSize={100}
                                            width={'100%'}
                                        >
                                            {UpTo10Row}
                                        </List>
                                    </div>
                                    <div className="tab-pane fade" id="list-profile" role="tabpanel"
                                         aria-labelledby="list-profile-list">
                                        <List
                                            className="List"
                                            height={650}
                                            itemCount={UpTo20.length}
                                            itemSize={100}
                                            width={'100%'}
                                        >
                                            {UpTo20Row}
                                        </List>
                                    </div>
                                    <div className="tab-pane fade" id="list-messages" role="tabpanel"
                                         aria-labelledby="list-messages-list">
                                        <List
                                            className="List"
                                            height={650}
                                            itemCount={UpTo30.length}
                                            itemSize={100}
                                            width={'100%'}
                                        >
                                            {UpTo30Row}
                                        </List>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AutoSizer>
                </div>
            </div>
        );
    }
}

Lists.contextType = MainContext;

