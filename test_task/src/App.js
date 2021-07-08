import React from 'react';
import Lists from "./Lists";
import {MainContext} from "./Context";
import Favorites from "./Favorites";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            currentCard: null,
            allCards: []
            // items: []
        };
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

    updateFavoriteCards = (value) => {
        this.setState(previousState => ({
            allCards: [...previousState.allCards, value]
        }));
    }

    removeFavoriteCards = (value) => {
        let test = this.state.allCards.filter(item => item.login.uuid !== value)
        this.setState({
            allCards: test
        });
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
                <MainContext.Provider value={{
                    items: this.state.items,
                    updateData: this.updateData,
                    currentCard: this.state.currentCard,
                    updateFavoriteCards: this.updateFavoriteCards,
                    allCards: this.state.allCards,
                    removeFavoriteCards: this.removeFavoriteCards
                }}>
                    <div className="container py-5">
                        <div className="input-group flex-nowrap mb-3">
                            <span className="input-group-text" id="addon-wrapping">Поиск </span>
                            <input type="text" className="form-control" placeholder="Leslie Nielsen"
                                   aria-label="Username"
                                   aria-describedby="addon-wrapping" onChange={this.filterList}/>
                        </div>

                        <div className="row">
                            <Lists/>
                            <Favorites/>

                        </div>
                    </div>
                </MainContext.Provider>
            );
        }
    }
}
