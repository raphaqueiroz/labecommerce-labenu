-- Active: 1682429994471@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT  UNIQUE NOT NULL,
    password TEXT  NOT NULL,
    create_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime'))
);

INSERT INTO users (id, name, email, password)
VALUES ("U001", "joão", "joão@email.com", "123456"),
("u002", "Maria", "maria@email.com", "21456"),
("u003", "Andrew", "andrew@email.com", "876845"),
("u004", "Dory", "dory@email.com", "846563"),
("u005", "Antonio", "antonio@email.com", "2316381");

SELECT * FROM users;

DROP TABLE products;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT
);

INSERT INTO products (id, name, price, description)
VALUES (
    "P001", "tênis", 150.00, "tenis masculino"
);

INSERT INTO products (id, name, price, description)
VALUES (
    "P002", "celular", 1199.00, "celular muito top"
),("p003", "mamadeira", 64.99, "mamadeira de 1 a 2 anos"),
("p004", "casaco", 89.00, "casaco inverno"),
("p005", "notebok", 2569.99, "notebook maravilhoso");


CREATE Table purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
 total_price REAL NOT NULL,
 paid INTEGER NOT NULL DEFAULT(0),
 create_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime')),
 buyer_id TEXT NOT NULL,
 FOREIGN KEY (buyer_id) REFERENCES users (id) ON UPDATE CASCADE
);

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("pcs001", 586.45, 1, "u002"),
("pcs002", 65432.54, 0, "u005"),
("pcs003", 654.54, 1, "u001"),
("pcs004", 651.98, 0, "u004");

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT(1),
  FOREIGN KEY (purchase_id) REFERENCES purchasess(id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE
);

INSERT INTO purchases_products VALUES
("pcs001", "p002", 1),
("pcs003", "p003", 1);