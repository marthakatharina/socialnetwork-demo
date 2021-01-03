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
    return db.query(
        `SELECT first, last, url, id FROM users WHERE first ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.getFriendshipStatus = (recipient_id, sender_id) => {
    return db.query(
        ` SELECT * FROM friendships
  WHERE (recipient_id = $1 AND sender_id = $2)
  OR (recipient_id = $2 AND sender_id = $1);`,
        [recipient_id, sender_id]
    );
};

module.exports.sendFriendRequest = (recipient_id, sender_id) => {
    return db.query(
        `INSERT INTO friendships (recipient_id, sender_id) VALUES ($1, $2);
`,
        [recipient_id, sender_id]
    );
};

module.exports.acceptFriendRequest = (recipient_id, sender_id) => {
    return db.query(
        `UPDATE friendships SET accepted=true WHERE recipient_id=$1 AND sender_id=$2`,
        [recipient_id, sender_id]
    );
};

module.exports.cancelFriendRequest = (recipient_id, sender_id) => {
    return db.query(
        `  DELETE FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)
        ;
        `,
        [recipient_id, sender_id]
    );
};

module.exports.getFriends = (id) => {
    return db.query(
        ` SELECT users.id, first, last, url, accepted
  FROM friendships
  JOIN users
  ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`,
        [id]
    );
};

module.exports.getRequests = (id) => {
    return db.query(
        ` SELECT users.id, first, last, url, accepted
  FROM friendships
  JOIN users
  ON (accepted = false AND sender_id = $1 AND recipient_id = users.id)`,
        [id]
    );
};

module.exports.getChatMessages = () => {
    return db.query(
        `SELECT chat_messages.sender_id AS sender_id, chat_messages.message AS message, chat_messages.created_at AS created_at, users.url AS url, users.first AS first, users.last AS last FROM chat_messages JOIN users ON sender_id = users.id ORDER BY created_at DESC LIMIT 20`,
        []
    );
};

module.exports.postChatMessages = (message, sender_id) => {
    // console.log("sender_id, message: ", sender_id, message);
    return db.query(
        `INSERT INTO chat_messages (message, sender_id)
        VALUES ($1, $2)`,
        [message, sender_id]
    );
};

// module.exports.getWallMessages = (id) => {
//     return db.query(
//         `SELECT wall_messages.author_id AS author_id, wall_messages.message AS message, wall_messages.created_at AS created_at, users.url AS url, users.first AS first, users.last AS last FROM wall_messages JOIN users ON (user_id = $1 AND author_id = users.id)
//         OR (author_id = $1 AND user_id = users.id) ORDER BY created_at DESC`,

//         // `SELECT * FROM wall_messages WHERE (author_id = $1 AND user_id = $2) OR (author_id = $2 AND user_id = $1)`,
//         [id]
//     );
// };

// module.exports.postWallMessages = (message, author_id, user_id) => {
//     return db.query(
//         `INSERT INTO wall_messages (message, author_id, user_id)
//         VALUES ($1, $2, $3)`,
//         [message, author_id, user_id]
//     );
// };

module.exports.deleteAccount = (id) => {
    return db.query(`DELETE FROM users WHERE id = $1;`, [id]);
};
// ON DELETE CASCADE next to REFERENCES clears the user's info in all other tables
