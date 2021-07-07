import React from 'react';
import List from "./List";
import {MainContext} from "./Context";
import Favorites from "./Favorites";
import Block from "./Block";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isLoadedFilter: false,
            currentCard: null,
            allCards: []
        };
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        fetch("https://api.randomuser.me/?results=100" +
            "")
            .then(res => res.json())
            .then(
                (result) => {
                    let UpTo10 = [];
                    let UpTo20 = [];
                    let UpTo30 = [];

                    result.results.map((item, index) => {
                        if (item.registered.age <= 10) {
                            UpTo10.push(<Block item={item}/>)
                        } else if (item.registered.age > 10 && item.registered.age <= 20) {
                            UpTo20.push(<Block item={item}/>)
                        } else if (item.registered.age > 20 && item.registered.age <= 30) {
                            UpTo30.push(<Block item={item}/>)
                        }
                    })
                    this.items = result.results;
                    this.setState({
                        isLoaded: true,
                        items: {items: {UpTo10: UpTo10, UpTo20: UpTo20, UpTo30: UpTo30}}
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
        let Cards = this.state.allCards.filter(item => item.login.uuid !== value)
        this.setState({
            allCards: Cards
        });
    }

    filterList(e) {
        let UpTo10 = [];
        let UpTo20 = [];
        let UpTo30 = [];

        const filteredList = this.items.filter(item => {
            if (item.name.first.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return item.name.first.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            } else if (item.name.last.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return item.name.last.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            }
        })
        this.setState({
            isLoadedFilter: true
        })
            filteredList.map((item, index) => {
                if (item.registered.age <= 10) {
                    UpTo10.push(<Block item={item}/>)
                } else if (item.registered.age > 10 && item.registered.age <= 20) {
                    UpTo20.push(<Block item={item}/>)
                } else if (item.registered.age > 20 && item.registered.age <= 30) {
                    UpTo30.push(<Block item={item}/>)
                }
            })

        console.log("end")
        this.setState({items: {items: {UpTo10: UpTo10, UpTo20: UpTo20, UpTo30: UpTo30}}});
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
                    <div className="container py-5 vh-100">
                        <div className="input-group flex-nowrap mb-3">
                            <span className="input-group-text" id="addon-wrapping">Поиск </span>
                            <input type="text" className="form-control" placeholder="Leslie Nielsen"
                                   aria-label="Username"
                                   aria-describedby="addon-wrapping" onChange={this.filterList}/>
                        </div>

                        <div className="row d-flex bd-highlight">
                            <List/>
                            <Favorites/>

                        </div>
                    </div>
                </MainContext.Provider>
            );
        }
    }
}
