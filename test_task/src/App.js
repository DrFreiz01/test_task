import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import Block from "./Block";
import List from "./List";
import {MainContext} from "./Context";
import Favorites from "./Favorites";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            currentCard: null
            // items: []
        };
        let items = [];
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        fetch("https://api.randomuser.me/?results=100" +
            "")
            .then(res => res.json())
            .then(
                (result) => {
                    this.items = result.results;
                    this.setState({
                        isLoaded: true,
                        items: result.results
                    });
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    updateData = (value) => {
        this.setState({currentCard: value})
    }

    filterList(e) {
        const filteredList = this.items.filter(item => {
            if (item.name.first.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return item.name.first.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            } else if (item.name.last.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return item.name.last.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            }
        });
        this.setState({items: filteredList});
    }

    render() {
        console.log(this.state.currentCard)
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div className="d-flex justify-content-center align-items-center w-100 vh-100">
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        } else {
            return (
                <MainContext.Provider value={{items: this.state.items, updateData: this.updateData, currentCard: this.state.currentCard}}>
                    <div className="container py-5">
                        <div className="input-group flex-nowrap mb-3">
                            <span className="input-group-text" id="addon-wrapping">Поиск </span>
                            <input type="text" className="form-control" placeholder="Leslie Nielsen"
                                   aria-label="Username"
                                   aria-describedby="addon-wrapping" onChange={this.filterList}/>
                        </div>

                        <div className="row">
                            <List/>
                            <Favorites />

                        </div>
                    </div>
                </MainContext.Provider>
            );
        }
    }
}
