 DROP TABLE IF EXISTS friendships CASCADE;

 CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL /*ON DELETE CASCADE*/,
   recipient_id INT REFERENCES users(id) NOT NULL /*ON DELETE CASCADE*/,
   accepted BOOLEAN DEFAULT false
 );