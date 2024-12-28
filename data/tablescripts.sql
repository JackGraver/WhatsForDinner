
DROP TABLE restaurant;
CREATE TABLE restaurant (
    restaurant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_name STRING NOT NULL,
    category_id INTEGER,
    last_visit DATE,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

DROP TABLE category;
CREATE TABLE category (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name STRING NOT NULL
);

INSERT INTO category (category_name)
VALUES ('Chinese'), ('Vietnamese'), ('Burgers'), ('Middle Eastern'), ('Pizza'), ('Deli'), ('Mexican');

INSERT INTO restaurant (restaurant_name, category_id, last_visit)
VALUES ('Alumni', 3, '2024-11-05'), 
        ('Vietnamese Palace', 2, '2024-12-24'),
        ('Damascus', 4, '2024-06-04'),
        ('Cold Beer and Pizza', 5, '2024-09-24'),
        ('Myhres Deli', 6, '2024-10-4'),
        ('Blanco', 7, '2024-11-23');