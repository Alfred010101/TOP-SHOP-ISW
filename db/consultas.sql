SELECT * FROM top_shop.users;
SELECT * FROM top_shop.address;
SELECT * FROM top_shop.tshirts;
SELECT * FROM top_shop.shopping_cart_items;

delete from top_shop.address where id = 18;
delete from top_shop.users where id = 18;
update top_shop.users 
set role ='ADMIN'
where id = 13;

SELECT * FROM top_shop.users 
WHERE email = 'usuariX';

ALTER TABLE top_shop.tshirts
ADD COLUMN `resource` VARCHAR(63) NOT NULL;


drop database top_shop;

drop table top_shop.shopping_cart_items;

show  tables from top_shop;