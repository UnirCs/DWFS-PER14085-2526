-- Precarga de operaciones en H2
INSERT INTO operations (id, type, arguments, result) VALUES (1, 'SUM', '10,5,2', 17);
INSERT INTO operations (id, type, arguments, result) VALUES (2, 'SUB', '100,30,20', 50);
INSERT INTO operations (id, type, arguments, result) VALUES (3, 'MUL', '6,7', 42);
INSERT INTO operations (id, type, arguments, result) VALUES (4, 'DIV', '100,5', 20);
INSERT INTO operations (id, type, arguments, result) VALUES (5, 'POW', '2,8', 256);
INSERT INTO operations (id, type, arguments, result) VALUES (6, 'ROOT', '27,3', 3);