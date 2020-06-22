import React from "react";

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
        setTimeout(getAPI, 1000);
    }

    let analyticsSection = "";
    if (data) {
        analyticsSection = (
            <>
                <h1>{data.linkId}</h1>
                <a
                    href={data.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className=''>
                    {data.link}
                </a>
                <Chart />
            </>
        );
    }
    if (error) {
        analyticsSection = <p className=''>Error: {error}</p>;
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
            <h1>Analytics</h1>
            <form onSubmit={getAnalytics}>
                <div className='row'>
                    <div className='m-four d-three'>
                        <input
                            id='linkIdInput'
                            className='width-full'
                            type='text'
                            placeholder='Link ID'
                        />
                    </div>
                    <div className='m-four d-one'>{formButton}</div>
                </div>
            </form>
            {analyticsSection}
        </>
    );
}
function Chart() {
    return (
        <div className='code'>
            <p className=''>Chart</p>
        </div>
    );
}
