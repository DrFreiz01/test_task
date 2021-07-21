import React from 'react';
import Lists from "./Lists";
import {MainContext} from "./Context";
import Favorites from "./Favorites";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ListUsers: [],
            ListUsersMain: [],
            currentCard: null,
            allCards: []
        };
    }

    componentDidMount() {
        fetch("https://api.randomuser.me/?results=10" +
            "")
            .then(res => res.json())
            .then(
                (result) => {
                    const UpTo10 = [];
                    const UpTo20 = [];

                    result.results.map((item, index) => {
                        Math.ceil((item.registered.age / 10)) === 1 ? UpTo10.push(item) : UpTo20.push(item)
                    })

                    this.setState({
                        isLoaded: true,
                        ListUsers: {UpTo10: UpTo10, UpTo20: UpTo20},
                        ListUsersMain: result.results
                    });
                },
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
        const result = this.state.allCards.filter(item => item.login.uuid == value.login.uuid)
        if (result.length == 0) {
            this.setState(previousState => ({
                allCards: [...previousState.allCards, value]
            }));
        }
    }

    removeFavoriteCards = (value) => {
        const result = this.state.allCards.filter(item => item.login.uuid !== value)
        this.setState({
            allCards: result
        });
    }

    filterList = (e) => {
        const filteredList = this.state.ListUsersMain.filter(item => {
            return item.name.first.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                || item.name.last.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        })

        console.log(filteredList)

        const UpTo10 = [];
        const UpTo20 = [];

        filteredList.map((item, index) => {
            Math.ceil((item.registered.age / 10)) === 1 ? UpTo10.push(item) : UpTo20.push(item)
        })

        this.setState({
            ListUsers: {UpTo10: UpTo10, UpTo20: UpTo20}
        });
    }

    render() {
        const {error, isLoaded, ListUsers, allCards, currentCard} = this.state;
        const { updateData, updateFavoriteCards, removeFavoriteCards, filterList } = this;

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
                    ListUsers: ListUsers,
                    updateData: updateData,
                    currentCard: currentCard,
                    updateFavoriteCards: updateFavoriteCards,
                    allCards: allCards,
                    removeFavoriteCards: removeFavoriteCards,
                    filterList: filterList
                }}>

                    <div className="container p-4 vh-100">
                        <div className="row h-100">
                            <Lists/>
                            <Favorites/>
                        </div>
                    </div>

                </MainContext.Provider>
            );
        }
    }
}
