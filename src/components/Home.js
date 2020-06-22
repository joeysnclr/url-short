import React from "react";

export default function Home() {
    return (
        <>
            <div className='my-m'>
                <h1>Shorten Those Links!</h1>
                <p className='my-s'>
                    Build and protect your brand using powerful, recognizable
                    short links.
                </p>
                <Generate />
            </div>
            <Documentation />
        </>
    );
}

function Generate() {
    const [hasSubmitted, setHasSubmitted] = React.useState(false);
    const [generatedLink, setGeneratedLink] = React.useState(undefined);
    const [error, setError] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    function generateLink(e) {
        e.preventDefault();
        setLoading(true);
        setHasSubmitted(true);
        const linkInput = document.querySelector("#linkInput").value;
        const apiRoute = "/api/generate?l=" + linkInput;
        function getAPI() {
            fetch(apiRoute)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        const shortLink =
                            window.location.origin + "/" + data.linkId;
                        setGeneratedLink(shortLink);
                    }
                    setLoading(false);
                });
        }
        setTimeout(getAPI, 250);
    }
    function backToGenerate() {
        setHasSubmitted(false);
        setError(undefined);
    }
    function copyLink() {
        const link = document.getElementById("generatedLink").innerText;
        const textField = document.createElement("textarea");
        textField.innerText = link;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    }
    if (!hasSubmitted) {
        return (
            <form onSubmit={generateLink}>
                <div className='row'>
                    <div className='m-four d-three'>
                        <input
                            id='linkInput'
                            className='my-s width-full'
                            type='text'
                            placeholder='Paste your link here.'
                        />
                    </div>
                    <div className='m-four d-one'>
                        <button
                            className='my-s btn-green width-full'
                            type='submit'>
                            Generate Link
                        </button>
                    </div>
                </div>
            </form>
        );
    } else {
        let message = (
            <a href={generatedLink} target='noopener noreferrer'>
                {generatedLink}
            </a>
        );
        let primaryButton = (
            <button className='my-s btn-green width-full' onClick={copyLink}>
                Copy Link
            </button>
        );
        let secondaryButton = (
            <button
                className='my-s btn-yellow width-full'
                onClick={backToGenerate}>
                Back
            </button>
        );
        if (loading) {
            message = "Loading...";
            primaryButton = React.cloneElement(primaryButton, {
                disabled: true,
            });
            secondaryButton = React.cloneElement(secondaryButton, {
                disabled: true,
            });
        } else if (error) {
            message = "Error: " + error;
            primaryButton = React.cloneElement(primaryButton, {
                disabled: true,
            });
        }
        return (
            <div className='row'>
                <div className='m-four d-two'>
                    <div className='my-s code' id='generatedLink'>
                        {message}
                    </div>
                </div>
                <div className='m-two d-one'>{primaryButton}</div>
                <div className='m-two d-one'>{secondaryButton}</div>
            </div>
        );
    }
}

function Documentation() {
    return (
        <div className='my-m'>
            <h1 id='api'>Use Our API!</h1>
            <p className='my-s'>
                With our API you can generate and share shortened links within
                the constraints of your own application.
            </p>
            <div className='row'>
                <div className='m-four d-two'>
                    <h2 className='my-s'>Generate URL Endpoint</h2>
                    <div className='code'>
                        <p className=''>GET /api/generate?l=link</p>
                        <p className=''>{"{"}</p>
                        <p className='indent'>linkId: linkId</p>
                        <p className=''>{"}"}</p>
                    </div>
                </div>
                <div className='m-four d-two'>
                    <h2 className='my-s'>Analytics Endpoint</h2>
                    <div className='code'>
                        <p className=''>GET /api/analytics/linkId</p>
                        <p className=''>{"{"}</p>
                        <p className='indent'>linkId: linkId</p>
                        <p className='indent'>link: link</p>
                        <p className='indent'>visits: [</p>
                        <p className='indent'>
                            <p className='indent'>{"{"}</p>
                            <p className='indent'>
                                <p className='indent'>date: date</p>
                            </p>
                            <p className='indent'>{"}"}</p>
                        </p>
                        <p className='indent'>]</p>
                        <p className='indent'>chart: {"{"}</p>
                        <p className='indent'>
                            <p className='indent'>labels: []</p>
                            <p className='indent'>dataPoints: []</p>
                        </p>
                        <p className='indent'>{"}"}</p>
                        <p className=''>{"}"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
