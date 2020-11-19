 DROP TABLE IF EXISTS friendships CASCADE;

 CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
   recipient_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
   accepted BOOLEAN DEFAULT false
 );