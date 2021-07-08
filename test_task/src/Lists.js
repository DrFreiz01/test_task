import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Block from "./Block";
import {MainContext} from "./Context";

export default class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let value = this.context;
        let UpTo10 = []
        let UpTo20 = []
        let UpTo30 = []
        return (
            <div className="col-6">

                {value.items.map((item, index) => {
                    if (item.registered.age <= 10) {
                        UpTo10.push(<Block item={item}/>)
                    } else if (item.registered.age > 10 && item.registered.age <= 20) {
                        UpTo20.push(<Block item={item}/>)
                    } else if (item.registered.age > 20 && item.registered.age <= 30) {
                        UpTo30.push(<Block item={item}/>)
                    }
                })}

                <div className="accordion" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                <div className="d-flex">
                                    <div className="pe-5"><b>Всего {UpTo10.length} записей</b></div>
                                    <div>{UpTo10.length == 0 ? 'Ничего не нашлось' : 'От 0 до 10 года'}</div>
                                </div>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse p-2"
                             aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            {UpTo10}
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                    aria-controls="flush-collapseTwo">
                                <div className="d-flex">
                                    <div className="pe-5"><b>Всего {UpTo20.length} записей</b></div>
                                    <div>{UpTo20.length == 0 ? 'Ничего не нашлось' : 'От 10 до 20 года'}</div>
                                </div>
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse p-2"
                             aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            {UpTo20}
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingThree">
                            <button className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree" aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                <div className="d-flex">
                                    <div className="pe-5"><b>Всего {UpTo30.length} записей</b></div>
                                    <div>{UpTo30.length == 0 ? 'Ничего не нашлось' : 'От 20 до 30 года'}</div>
                                </div>
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse p-2"
                             aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            {UpTo30}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

List.contextType = MainContext;

