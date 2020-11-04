const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bcrypt = require("./bc");
const csurf = require("csurf");

app.use(
    cookieSession({
        secret: "I'm depressed",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("public"));
app.use(express.json());

app.post("/registration", (req, res) => {
    console.log("Hit the post register route!!!");
    console.log("req.body: ", req.body);

    const { first, last, email, password } = req.body;

    // if (first && last && email && password) {
    db.userInfo(email)
        .then(({ rows }) => {
            if (rows.length === 0) {
                bcrypt
                    .hash(password)
                    .then((hash) => {
                        db.addUser(first, last, email, hash)
                            .then(({ rows }) => {
                                console.log("rows: ", rows);
                                req.session.userId = {
                                    id: rows[0].id,
                                    // first: first,
                                    // last: last,
                                    // email: email,
                                };

                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("err in addUser:", err);
                            });
                    })
                    .catch((err) => {
                        console.log("err in hash: /registration", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err in userInfo: /registration", err);
        });
    // } else if (!first || !last || !email || !password) {
    //     res.redirect("/welcome");
    //     res.json({ error: true });
    // }

    // when everything works (i.e. hashing and inserting a row, and adding somethin to the session object)
    // req.session.userId = row[0].id;
    // res.json({ success: true });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // if (email && password) {
    db.userInfo(email)
        .then(({ rows }) => {
            if (rows.length !== 0) {
                const hash = rows[0].password;
                bcrypt.compare(password, hash).then((auth) => {
                    if (auth) {
                        req.session.userId = {
                            id: rows[0].id,
                            // first: rows[0].first,
                            // last: rows[0].last,
                            // email: rows[0].email,
                        };

                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err in userInfo / login", err);
        });
    // } else if (!email || !password) {
    //     res.json({ error: true });
    // }
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// this get must always be the last
app.get("*", function (req, res) {
    console.log("req.session: ", req.session);
    // console.log("req.session.userId: ", req.session.userId);
    // console.log("!res.session.userId: ", !res.session.userId);
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
