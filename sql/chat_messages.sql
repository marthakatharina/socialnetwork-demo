DROP TABLE IF EXISTS chat_messages CASCADE;

 CREATE TABLE chat_messages(
   id SERIAL PRIMARY KEY REFERENCES,
   sender_id INT REFERENCES users(id) NOT NULL,
   message TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

--  INSERT INTO chat_messages (sender_id, message) VALUES (
    
--     1, 
--     'This photo brings back so many great memories.'
-- );

-- INSERT INTO chat_messages (sender_id, message) VALUES (
--     9,
--     'We can''t go on together with suspicious minds.'
-- );

-- INSERT INTO chat_messages (sender_id, message) VALUES (
--     11,
--     'That is the question.'
-- );