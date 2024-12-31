DROP TABLE restaurant;
CREATE TABLE restaurant (
    restaurant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_name STRING NOT NULL,
    last_visit DATE
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

INSERT INTO category (category_name)
VALUES ('Chinese'), ('Vietnamese'), ('Burgers'), ('Middle Eastern'), ('Pizza'), ('Deli'), ('Mexican');

INSERT INTO restaurant (restaurant_name, last_visit)
VALUES ('Alumni', '2024-11-05'), 
        ('Vietnamese Palace', '2024-12-24'),
        ('Damascus', '2024-06-04'),
        ('Cold Beer and Pizza', '2024-09-24'),
        ('Myhres Deli', '2024-10-4'),
        ('Blanco', '2024-11-23');

INSERT INTO restaurant_category (category_id, restaurant_id)
VALUES (1, 1), (2, 3), (3, 1), (4, 2), (5, 5), (1, 2);