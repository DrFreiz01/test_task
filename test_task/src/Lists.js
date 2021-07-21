import React from 'react';
import Block from "./Block";
import {MainContext} from "./Context";
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'UpTo10'
        }
    }

    switchTab(test) {
        this.setState({
            activeTab: test
        })
    }

    render() {
        const {ListUsers, filterList} = this.context;

        const UpTo10Row = ({index, style}) => (
            <div style={style}>
                <Block item={ListUsers.UpTo10[index]}/>
            </div>
        );

        const UpTo20Row = ({index, style}) => (
            <div style={style}>
                <Block item={ListUsers.UpTo20[index]}/>
            </div>
        );

        return (
            <div id="idList" className="col-6 h-100 border border-1 rounded p-3">
                <input style={{height: '5%'}} type="text" className="border border-1 w-100 rounded ps-3 mb-2"
                       placeholder="Поиск" onChange={filterList}/>

                <div style={{height: '5%'}} className='border border-1 w-100 rounded mb-2 d-flex'>
                    <div className='UserListBG w-50 d-flex justify-content-around align-items-center'
                         onClick={() => this.switchTab('UpTo10')}>
                        <span>От 10 до 20</span>
                        <span
                            className={'badge bg-primary rounded-pill float-end p-2' +
                            (ListUsers.UpTo10.length > 0 ? ' bg-primary' : ' bg-secondary')}>Нашёл {ListUsers.UpTo10.length}
                        </span>
                    </div>
                    <div
                        className='UserListBG w-50 d-flex justify-content-around align-items-center border-1 border-start'
                        onClick={() => this.switchTab('UpTo20')}>
                        <span>От 20 до 30</span>
                        <span
                            className={'badge bg-primary rounded-pill float-end p-2' +
                            (ListUsers.UpTo20.length > 0 ? ' bg-primary' : ' bg-secondary')}>Нашёл {ListUsers.UpTo20.length}
                        </span>
                    </div>
                </div>

                <AutoSizer style={{width: '100%', height: '89%'}}>
                    {() => (
                        <div className='wrapperList h-100 border-1 border rounded p-2'>
                            <List
                                id={"UpTo10"}
                                className={this.state.activeTab === 'UpTo10' ? 'd-block' : 'd-none'}
                                height={650}
                                itemCount={ListUsers.UpTo10.length}
                                itemSize={100}
                                width={'100%'}
                            >
                                {UpTo10Row}
                            </List>

                            <List
                                id={"UpTo20"}
                                className={this.state.activeTab === 'UpTo20' ? 'd-block' : 'd-none'}
                                height={650}
                                itemCount={ListUsers.UpTo20.length}
                                itemSize={100}
                                width={'100%'}
                            >
                                {UpTo20Row}
                            </List>
                        </div>
                    )}
                </AutoSizer>
            </div>
        );
    }
}

Lists.contextType = MainContext;

