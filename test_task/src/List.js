import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Block from "./Block";
import {MainContext} from "./Context";

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log('asd')
    }

    render() {
        let value = this.context;
        console.log(value)
        return (
            <div className="col-6 flex-grow-1">
                <div className="accordion" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                <div className="d-flex">
                                    <div className="pe-5"><b>Всего  записей</b></div>
                                    <div></div>
                                </div>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse p-2 overflow-auto"
                             aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            {value.items.items.UpTo10}
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                    aria-controls="flush-collapseTwo">
                                <div className="d-flex">
                                    <div className="pe-5"><b>Всего  записей</b></div>
                                    <div></div>
                                </div>
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse p-2 overflow-auto"
                             aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            {value.items.items.UpTo20}
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingThree">
                            <button className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree" aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                <div className="d-flex">
                                    <div className="pe-5"><b>Всего  записей</b></div>
                                    <div></div>
                                </div>
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse p-2 overflow-auto"
                             aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            {value.items.items.UpTo30}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

List.contextType = MainContext;

