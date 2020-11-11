const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bcrypt = require("./bc");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const multer = require("multer"); // multer defines where to save files
const uidSafe = require("uid-safe"); // encodes file name
const path = require("path"); // grabs extention (jpg)
const s3 = require("./s3");

app.use(
    cookieSession({
        secret: "Secret is kept",
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

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

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

app.post("/reset/start", (req, res) => {
    const { email } = req.body;
    console.log("req.body in /start: ", req.body);

    db.userInfo(email)
        .then(({ rows }) => {
            if (rows.length !== 0) {
                // req.session.userId = {
                //     id: rows[0].id,
                // };
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.addCode(email, secretCode)
                    .then(() => {
                        const { first } = rows[0];
                        const message = `Hi ${first}, here is your code to reset your password: ${secretCode} `;
                        const subject = `Verification code`;
                        return ses.sendEmail(email, message, subject);
                    })
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("err in addCode / reset/start", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err in userInfo / reset/start", err);
        });
});

app.post("/reset/verify", (req, res) => {
    console.log("req.body in /verify: ", req.body);
    const { email, password, code } = req.body;

    db.getCode(email)
        .then(({ rows }) => {
            if (code == rows[0].code) {
                console.log("rows[0].code: ", rows[0].code);
                bcrypt
                    .hash(password)
                    .then((hash) => {
                        return db.updatePassword(hash, email);
                    })
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log(
                            "err in updatePassword / reset/verify",
                            err
                        );
                    });
            } else {
                res.json({
                    success: false,
                    message: "the code does not match or it has expired",
                });
            }
        })
        .catch((err) => {
            console.log("err in getCode / reset/verify", err);
        });
});

app.post("/image", uploader.single("file"), s3.upload, function (req, res) {
    const { filename } = req.file;
    const url = `https://s3.amazonaws.com/spicedling/${filename}`;
    const { id } = req.session.userId;
    console.log("req.file: ", req.file);

    if (req.file) {
        db.addImage(url, id)
            .then(({ rows }) => {
                // rows = rows[0];
                console.log("rows: ", rows[0].url);
                res.json(rows[0].url);
            })
            .catch((err) => {
                console.log("error in addImage", err);
            });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/bio", (req, res) => {
    const { bio } = req.body;
    const { id } = req.session.userId;

    db.addBio(bio, id)
        .then(({ rows }) => {
            // rows = rows[0];
            console.log("rows: ", rows[0].bio);
            res.json(rows[0].bio);
        })
        .catch((err) => {
            console.log("error in addImage", err);
        });
});

app.get("/api/user", (req, res) => {
    const { id } = req.session.userId;

    console.log("id: ", id);
    // if (req.session.userId) {
    db.userInfoById(id)
        .then(({ rows }) => {
            res.json(rows[0]);
            console.log("rows: ", rows);
        })
        .catch((err) => {
            console.log("error in /user server", err);
        });
    // } else {
    //     res.sendFile(__dirname + "/index.html");
    // }
});

app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    console.log("req.params.id: ", req.params.id);
    if (id != req.session.userId.id) {
        db.userInfoById(id)
            .then(({ rows }) => {
                if (rows[0] || rows.length !== 0) {
                    res.json(rows[0]);
                    console.log("rows: ", rows);
                } else {
                    res.json({
                        success: false,
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in /user/:id server", err);
            });
    } else {
        res.json({ error: true });
    }
});

app.get("/api/users", (req, res) => {
    db.lastThreeUsers()
        .then(({ rows }) => {
            res.json(rows);
            console.log("row in lastThreeUsers: ", rows);
        })
        .catch((err) => {
            console.log("error in /user server", err);
        });
});

app.get("/api/users/:user", (req, res) => {
    const { user } = req.params;

    console.log("req.params: ", req.params);

    db.getMatchingUsers(user)
        .then(({ rows }) => {
            res.json(rows[0]);
            console.log("rows in getMatchingUsers : ", rows);
        })
        .catch((err) => {
            console.log("error in /user server", err);
        });
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
