import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/App.css";
import Nav from "./Nav";
import Home from "./Home";
import Analytics from "./Analytics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Line } from "react-chartjs-2";

// init fonawesome
library.add(fab, faBars);
export default function App() {
    return (
        <BrowserRouter>
            <Nav />
            <div className='container'>
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/analytics' exact>
                        <Analytics />
                    </Route>
                    <Route path='/components' exact>
                        <h1>This is an h1</h1>
                        <h2>This is an h2</h2>
                        <p className='logo'>This is a logo</p>
                        <FontAwesomeIcon icon='bars' />
                        <p>This is a paragraph</p>
                        <p>
                            <a href='/components'>This is a link</a>
                        </p>
                        <input type='text' placeholder='This is an input' />
                        <p>
                            <button>This is a button</button>
                            <button className='btn-red'>Red Button</button>
                            <button className='btn-green'>Green Button</button>
                            <button className='btn-yellow'>
                                Yellow Button
                            </button>
                            <button className='width-full'>
                                This is a full button
                            </button>
                        </p>
                        <div className='code'>
                            <p>This is text in a code block</p>
                            <p>This is more text in the same block</p>
                        </div>
                        <h1>Grid</h1>
                        <div className='row'>
                            <div className='m-one d-two'>
                                m-one d-two Lorem ipsum dolor sit amet
                                consectetur, adipisicing elit. Hic ut a et sed
                                accusantium voluptatem numquam itaque dolorem
                                perspiciatis repudiandae labore cumque,
                                incidunt, quibusdam corrupti quasi possimus fuga
                                eveniet eligendi!
                            </div>
                            <div className='m-one d-two'>
                                m-one d-two Lorem ipsum dolor sit amet
                                consectetur, adipisicing elit. Hic ut a et sed
                                accusantium voluptatem numquam itaque dolorem
                                perspiciatis repudiandae labore cumque,
                                incidunt, quibusdam corrupti quasi possimus fuga
                                eveniet eligendi!
                            </div>
                            <div className='m-one d-two'>
                                m-one d-two Lorem ipsum dolor sit amet
                                consectetur, adipisicing elit. Hic ut a et sed
                                accusantium voluptatem numquam itaque dolorem
                                perspiciatis repudiandae labore cumque,
                                incidunt, quibusdam corrupti quasi possimus fuga
                                eveniet eligendi!
                            </div>
                            <div className='m-four d-two'>
                                m-four d-two Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Vero tempora,
                                molestias doloremque alias iusto, excepturi aut
                                ut tempore dolor ex eos. Error deserunt
                                aspernatur odit illo impedit ratione odio animi?
                            </div>
                        </div>
                        <div className='code'>
                            <Line
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    scales: {
                                        xAxes: [
                                            {
                                                ticks: {
                                                    fontColor: "#fff",
                                                },
                                                gridLines: {
                                                    display: false,
                                                },
                                            },
                                        ],
                                        yAxes: [
                                            {
                                                ticks: {
                                                    fontColor: "#fff",
                                                },
                                                gridLines: {
                                                    display: false,
                                                },
                                            },
                                        ],
                                    },
                                }}
                                data={{
                                    labels: [
                                        "sunday",
                                        "monday",
                                        "tuesday",
                                        "wednesday",
                                        "thursday",
                                        "friday",
                                        "saturday",
                                    ],
                                    datasets: [
                                        {
                                            fill: false,
                                            borderColor: "#2ecc71",
                                            backgroundColor: "#2ecc71",
                                            pointRadius: 0,
                                            label: "Data",
                                            data: [
                                                20000,
                                                14000,
                                                12000,
                                                15000,
                                                18000,
                                                19000,
                                                22000,
                                            ],
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
