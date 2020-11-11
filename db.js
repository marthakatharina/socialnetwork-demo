var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

module.exports.userInfo = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

module.exports.userInfoById = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.addCode = (email, code) => {
    return db.query(
        `
        INSERT INTO reset_codes (email, code)
        VALUES($1, $2) RETURNING *`,
        [email, code]
    );
};

module.exports.getCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE email = $1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes' ORDER BY timestamp DESC LIMIT 1`,
        [email]
    );
};

module.exports.updatePassword = (hash, email) => {
    return db.query(`UPDATE users SET password=$1 WHERE email=$2`, [
        hash,
        email,
    ]);
};

module.exports.addImage = (url, id) => {
    return db.query(`UPDATE users SET url=$1 WHERE id=$2 RETURNING url`, [
        url,
        id,
    ]);
};

module.exports.addBio = (bio, id) => {
    return db.query(`UPDATE users SET bio=$1 WHERE id=$2 RETURNING bio`, [
        bio,
        id,
    ]);
};

module.exports.lastThreeUsers = (id) => {
    return db.query(`SELECT * FROM users ORDER BY id = $1 DESC LIMIT 3`, [id]);
};

module.exports.getMatchingUsers = (val) => {
    return db.query(`SELECT first FROM users WHERE first ILIKE $1;`, [
        val + "%",
    ]);
};
