DROP TABLE restaurant;
CREATE TABLE restaurant (
    restaurant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_name STRING NOT NULL,
    last_visit DATE,
    rating INTEGER
);

DROP TABLE category;
CREATE TABLE category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name STRING NOT NULL
);

DROP TABLE restaurant_category;
CREATE TABLE restaurant_category (
    category_id INTEGER,
    restaurant_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

-- INSERT INTO category (category_name)
-- VALUES ('Chinese'), ('Vietnamese'), ('Burgers'), ('Middle Eastern'), ('Pizza'), ('Deli'), ('Mexican');

-- INSERT INTO restaurant (restaurant_name, last_visit, rating)
-- VALUES ('Alumni', '2024-11-05', 3), 
--         ('Vietnamese Palace', '2024-12-24', 4),
--         ('Damascus', '2024-06-04', 5),
--         ('Cold Beer and Pizza', '2024-09-24', 2),
--         ('Myhres Deli', '2024-10-4', 4),
--         ('Blanco', '2024-11-23', 3);

-- INSERT INTO restaurant_category (category_id, restaurant_id)
-- VALUES (1, 1), (2, 3), (3, 1), (4, 2), (5, 5), (1, 2);

INSERT INTO category (category_name) VALUES
('Italian'),
('Chinese'),
('Mexican'),
('Indian'),
('Japanese'),
('French'),
('American'),
('Thai'),
('Vegan'),
('Mediterranean');

INSERT INTO restaurant (restaurant_name, last_visit, rating) VALUES
('Pasta Paradise', '2024-01-01', 4),
('Sushi Supreme', '2024-01-03', 5),
('Taco Truck', '2023-12-25', 3),
('Curry House', '2023-12-30', 4),
('Burgers & Fries', '2024-01-02', 3),
('Bistro Bites', '2023-12-29', 5),
('Noodle Nirvana', '2023-12-28', 4),
('Pizza Palace', '2023-12-20', 4),
('Ramen Haven', '2023-12-22', 5),
('Vegan Valley', '2023-12-18', 4),
('The French Bistro', '2023-12-15', 5),
('Thai Taste', '2023-12-19', 3),
('Mediterranean Magic', '2024-01-05', 4),
('Dim Sum Delights', '2023-12-27', 4),
('BBQ Barn', '2024-01-04', 5);

-- Pasta Paradise (1 category)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(1, 1); -- Italian

-- Sushi Supreme (2 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(2, 5), (2, 6); -- Japanese, French

-- Taco Truck (1 category)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(3, 3); -- Mexican

-- Curry House (2 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(4, 4), (4, 7); -- Indian, American

-- Burgers & Fries (1 category)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(5, 7); -- American

-- Bistro Bites (2 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(6, 1), (6, 7); -- Italian, American

-- Noodle Nirvana (2 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(7, 2), (7, 7); -- Chinese, American

-- Pizza Palace (1 category)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(8, 1); -- Italian

-- Ramen Haven (3 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(9, 5), (9, 7), (9, 8); -- Japanese, American, Vegan

-- Vegan Valley (2 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(10, 8), (10, 9); -- Vegan, Mediterranean

-- The French Bistro (2 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(11, 6), (11, 9); -- French, Mediterranean

-- Thai Taste (1 category)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(12, 8); -- Vegan

-- Mediterranean Magic (1 category)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(13, 9); -- Mediterranean

-- Dim Sum Delights (1 category)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(14, 2); -- Chinese

-- BBQ Barn (2 categories)
INSERT INTO restaurant_category (restaurant_id, category_id) VALUES
(15, 3), (15, 7); -- Mexican, American
