const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

// mongo init
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
let Schema = mongoose.Schema;

// mongo models
let linkSchema = new Schema({
    linkId: String,
    link: String,
    visits: Array,
});
let Link = mongoose.model("Link", linkSchema);
// API param verification
function validURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}
// Date Manipulation
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
// express init
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/api/generate", function (req, res) {
    const link = req.query.l;
    if (!validURL(link)) {
        res.send({ error: "invalid link" });
        return;
    }
    let linkId = Math.random().toString(36).substr(2, 5);
    const newLink = new Link({
        linkId: linkId,
        link: link,
    });
    newLink.save(function (err) {
        if (err) throw err;
        console.log(`Link Created ${newLink.linkId}`);
    });
    res.send({ linkId: linkId });
});

app.get("/api/analytics/:linkId", function (req, res) {
    // get link data from database
    Link.findOne({ linkId: req.params.linkId }, function (err, obj) {
        if (err) res.send({ error: err });
        if (obj) {
            let response = {
                linkId: obj.linkId,
                link: obj.link,
                visits: obj.visits,
                chart: {
                    labels: [],
                    dataPoints: [],
                },
            };
            if (response.visits.length > 0) {
                const firstDate = new Date(response.visits[0].date);
                response.chart.labels = getDates(
                    new Date(
                        firstDate.getFullYear(),
                        firstDate.getMonth(),
                        firstDate.getDate()
                    ),
                    new Date()
                );
                response.chart.dataPoints = Array(
                    response.chart.labels.length
                ).fill(0);
                for (const visit of response.visits) {
                    const dateObj = new Date(visit.date);
                    const dayObj = new Date(
                        dateObj.getFullYear(),
                        dateObj.getMonth(),
                        dateObj.getDate()
                    );
                    const dayIndex = response.chart.labels.findIndex(function (
                        x
                    ) {
                        return x.valueOf() === dayObj.valueOf();
                    });
                    response.chart.dataPoints[dayIndex] += 1;
                }
            }
            res.send(response);
        } else {
            res.send({ error: "no link with that id" });
        }
    });
});

app.get("/:linkId", function (req, res) {
    const newVisit = {
        date: Date.now(),
    };
    Link.findOneAndUpdate(
        { linkId: req.params.linkId },
        { $push: { visits: newVisit } },
        function (err, link) {
            if (err) throw err;
            if (link) {
                res.redirect(link.link);
            } else {
                // send to react router if link id doesn't exist
                res.sendFile(path.join(__dirname + "/build/index.html"));
            }
        }
    );
});

// send to react if path not in backend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});
app.listen(process.env.PORT || 8080);
