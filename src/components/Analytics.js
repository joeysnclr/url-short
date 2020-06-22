import React from "react";
import { Line } from "react-chartjs-2";

export default function Analytics() {
    const [data, setData] = React.useState(undefined);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    function getAnalytics(e) {
        e.preventDefault();
        setError(false);
        setLoading(true);
        const linkIdInput = document.getElementById("linkIdInput").value;
        if (linkIdInput.length < 1) {
            setError("Please enter a Link ID");
            setLoading(false);
            return;
        }
        const apiRoute = "/api/analytics/" + linkIdInput;
        function getAPI() {
            fetch(apiRoute)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setData(data);
                    }
                    setLoading(false);
                });
        }
        setTimeout(getAPI, 250);
    }

    let analyticsSection = "";
    if (data) {
        analyticsSection = (
            <>
                <div className='my-s'>
                    <a
                        href={window.location.origin + "/" + data.linkId}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <h1>{data.linkId}</h1>
                    </a>
                    <a
                        href={data.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='wrap-text'>
                        {data.link}
                    </a>
                </div>
                <Chart data={data} />
            </>
        );
    }
    let errorMessage = "";
    if (error) {
        errorMessage = <p className=''>Error: {error}</p>;
    }
    let formButton = (
        <button className='btn-red width-full' type='submit'>
            View Analytics
        </button>
    );
    if (loading) {
        formButton = React.cloneElement(formButton, { disabled: true });
    }
    return (
        <>
            <div className='my-m'>
                <h1>Analytics</h1>
                <form onSubmit={getAnalytics}>
                    <div className='row'>
                        <div className='m-four d-three my-s'>
                            <input
                                id='linkIdInput'
                                className='width-full'
                                type='text'
                                placeholder='Link ID'
                            />
                        </div>
                        <div className='m-four d-one my-s'>{formButton}</div>
                        {errorMessage}
                    </div>
                </form>
            </div>
            {analyticsSection}
        </>
    );
}
function Chart(data) {
    data = data.data;
    if (data.visits.length < 1) {
        return <p>This link id has no visits.</p>;
    }
    const labels = data.chart.labels;
    const dataPoints = data.chart.dataPoints;
    return (
        <>
            <h2 className='my-s'>Visits</h2>
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
                                    type: "time",
                                    distribution: "series",
                                    time: { unit: "day" },
                                    display: true,
                                },
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        fontColor: "#fff",
                                        callback: function (value) {
                                            if (value % 1 === 0) {
                                                return value;
                                            }
                                        },
                                    },
                                    gridLines: {
                                        display: false,
                                    },
                                },
                            ],
                        },
                    }}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                fill: false,
                                borderColor: "#2ecc71",
                                backgroundColor: "#2ecc71",
                                pointRadius: 0,
                                label: "Data",
                                lineTension: 0,
                                data: dataPoints,
                            },
                        ],
                    }}
                />
            </div>
        </>
    );
}
