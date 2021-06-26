import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Block from "./Block";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
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

    filterList(e) {
        // console.log(this.state.items)
        const filteredList = this.items.filter(item => {
            if (item.name.first.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return item.name.first.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            } else if (item.name.last.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return item.name.last.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            }
        });
        // обновление состояния
        this.setState({items: filteredList});
    }

    dropHandler(e, item) {
        e.preventDefault()
        console.log(item)
    }

    dragOverHandler(e) {
        e.preventDefault()
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
            let UpTo10 = []
            let UpTo20 = []
            let UpTo30 = []


            return (
                <div className="container py-5">

                    <div className="input-group flex-nowrap mb-3">
                        <span className="input-group-text" id="addon-wrapping">Поиск </span>
                        <input type="text" className="form-control" placeholder="Leslie Nielsen" aria-label="Username"
                               aria-describedby="addon-wrapping" onChange={this.filterList} />
                    </div>

                    {this.state.items.map((item, index) => {
                        if (item.registered.age < 10) {
                            UpTo10.push(<Block item={item}/>)
                        } else if (item.registered.age > 10 && item.registered.age <= 20) {
                            UpTo20.push(<Block item={item}/>)
                        } else if (item.registered.age > 20 && item.registered.age <= 30) {
                            UpTo30.push(<Block item={item}/>)
                        }
                    })}

                    <div className="row">
                        <div className="col-6">
                            <div className="accordion" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseOne" aria-expanded="false"
                                                aria-controls="flush-collapseOne">
                                            10
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse p-2"
                                         aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        { UpTo10 }
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                                aria-controls="flush-collapseTwo">
                                            20
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse p-2"
                                         aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        { UpTo20 }
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                                aria-controls="flush-collapseThree">
                                            30
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse p-2"
                                         aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        { UpTo30 }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="border-1 rounded border h-100 pb-2"
                                 draggable={true}
                                 onDragOver={e => this.dragOverHandler(e)}
                                 onDrop={e => this.dropHandler(e, this.props.item)}>

                            </div>
                        </div>
                    </div>





                </div>

            );
        }
    }
}
