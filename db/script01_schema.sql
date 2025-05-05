CREATE DATABASE IF NOT EXISTS top_shop 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS top_shop.address(
	id INT AUTO_INCREMENT NOT NULL,
	street_name VARCHAR(100) NOT NULL,
    exterior_number VARCHAR(10) NOT NULL,
    interior_number VARCHAR(10),
    postal_code CHAR(5) NOT NULL,
    `references` VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS top_shop.users(
	id INT AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(63) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    fk_address INT,
    phone VARCHAR(20) NOT NULL,
    `role` ENUM('ADMIN', 'CUSTOMER') DEFAULT 'CUSTOMER',
    PRIMARY KEY(id),
    FOREIGN KEY(fk_address) REFERENCES top_shop.address(id)    
);

CREATE TABLE IF NOT EXISTS top_shop.tshirts(
	id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(31),
    `resource` VARCHAR(63) NOT NULL,
    category ENUM(
		'FRASES_Y_CITAS',
        'DISENOS_ARTISTICOS',
        'CULTURA_POP',
        'TEMPORADAS',
        'DISENOS_GEEK_Y_NERD'
	),
    `type` ENUM('HOMBRE', 'MUJER', 'NINO', 'NINA') NOT NULL,
    talla ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL') NOT NULL,
    price DECIMAL(6, 2),
    existence INT,
    `description` VARCHAR(127),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS top_shop.shopping_cart(
	id INT AUTO_INCREMENT NOT NULL,
    fk_user INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_user) REFERENCES top_shop.users(id)
);

CREATE TABLE IF NOT EXISTS top_shop.shopping_cart_items(
	id INT AUTO_INCREMENT NOT NULL,
    fk_cart INT NOT NULL,
    fk_tshirt INT NOT NULL,
    amount INT NOT NULL CHECK (amount > 0),
	PRIMARY KEY(id),
    FOREIGN KEY(fk_cart) REFERENCES top_shop.shopping_cart(id),
    FOREIGN KEY(fk_tshirt) REFERENCES top_shop.tshirts(id)
);

CREATE TABLE IF NOT EXISTS top_shop.tickets(
	id INT AUTO_INCREMENT NOT NULL,
    fk_user INT NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    `status` ENUM('nuevo', 'pagado', 'enviado', 'completado', 'cancelado') DEFAULT 'nuevo',
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS top_shop.ticket_items(
	id INT AUTO_INCREMENT NOT NULL,
	fk_ticket INT NOT NULL,
    fk_tshirt INT,
    `name` VARCHAR(31) NOT NULL,
    amount INT NOT NULL CHECK (amount > 0),
    price DECIMAL(6, 2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (amount * price) STORED,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_ticket) REFERENCES top_shop.tickets(id)
);

CREATE TABLE IF NOT EXISTS top_shop.payments(
    id INT AUTO_INCREMENT NOT NULL,
    fk_ticket INT NOT NULL,
    payment_method ENUM('tarjeta', 'paypal', 'oxxo', 'transferencia') NOT NULL,
    payment_status ENUM('pendiente', 'pagado', 'fallido') NOT NULL DEFAULT 'pendiente',
    paid_at DATETIME,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_ticket) REFERENCES top_shop.tickets(id)
);

CREATE TABLE IF NOT EXISTS top_shop.shipments (
    id INT AUTO_INCREMENT NOT NULL,
    fk_ticket INT NOT NULL,
    shipment_status ENUM('pendiente', 'enviado', 'entregado', 'cancelado') NOT NULL DEFAULT 'pendiente',
    tracking_number VARCHAR(64),
    shipped_at DATETIME,
    delivered_at DATETIME,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_ticket) REFERENCES top_shop.tickets(id)
);

