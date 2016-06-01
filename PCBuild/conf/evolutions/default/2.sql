# --- !Ups
insert into motherboard (manufacturer, model, socket, memory_type, image_url, price, popularity)
values ('ASUS', 'Z170', 'LGA 1151', 'DDR4', 'https://static.digitecgalaxus.ch/Files/5/1/5/4/5/7/8/Z170%20Pro%20Gaming_10.jpg?fit=inside%7C464:368&output-format=progressive-jpeg',157.0, 0);
insert into motherboard (manufacturer, model, socket, memory_type, image_url, price, popularity)
values ('ASUS', 'Maximus VIII Hero', 'LGA 1151', 'DDR4', 'https://static.digitecgalaxus.ch/Files/5/1/5/4/5/9/3/Maximus%20VIII%20Hero_3D-1_light%20on.jpg?fit=inside%7C464:368&output-format=progressive-jpeg',221.0, 0);
insert into motherboard (manufacturer, model, socket, memory_type, image_url, price, popularity)
values ('Gigabyte', 'GA-Z170MX', 'LGA 1151', 'DDR4', 'https://static.digitecgalaxus.ch/Files/4/9/4/2/7/6/0/20150821142219_src.png?fit=inside%7C464:368&output-format=progressive-jpeg',192.0, 0);
insert into motherboard (manufacturer, model, socket, memory_type, image_url, price, popularity)
values ('Asus', 'M5A99X EVO R2', 'AM3+', 'DDR3', 'https://static.digitecgalaxus.ch/Files/4/9/7/9/4/9/8/254842.jpg?fit=inside%7C425:350&output-format=progressive-jpeg',139.0, 0);
insert into motherboard (manufacturer, model, socket, memory_type, image_url, price, popularity)
values ('AsRock', '990FX Extreme9', 'AM3+', 'DDR3', 'https://static.digitecgalaxus.ch/Files/9/4/8/1/9/2/990FX20Extreme928m29.jpg?fit=inside%7C464:368&output-format=progressive-jpeg',214.0, 0);

insert into storage (manufacturer, model, gigabytes, rotation_speed, image_url, price, popularity)
values ('WD', 'Red', 3000, 5400, 'https://static.digitecgalaxus.ch/Files/5/7/5/2/6/4/WD30EFRX.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 120.0, 2);
insert into storage (manufacturer, model, gigabytes, rotation_speed, image_url, price, popularity)
values ('WD', 'Blue', 1000, 7200, 'https://static.digitecgalaxus.ch/Files/5/2/6/0/8/6/5/WD10EZEX.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 59.0, 5);
insert into storage (manufacturer, model, gigabytes, rotation_speed, image_url, price, popularity)
values ('Hitachi', 'Deskstar 7K4000', 4000, 7200, 'https://static.digitecgalaxus.ch/Files/5/2/6/0/8/6/5/WD10EZEX.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 148.0, 3);
insert into storage (manufacturer, model, gigabytes, rotation_speed, image_url, price, popularity)
values ('Seagate', 'Spinpoint M9T', 2000, 5400, 'https://static.digitecgalaxus.ch/Files/5/2/7/7/0/4/1/Seagate-Spinpoint-M9T-World-s-Thinnest-2TB-HDD-397702-2.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 105.0, 10);
insert into storage (manufacturer, model, gigabytes, rotation_speed, image_url, price, popularity)
values ('Toshiba', 'DT01ACA200', 2000, 7200, 'https://static.digitecgalaxus.ch/Files/4/9/9/7/0/7/4/247275.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 74.0, 7);

insert into alimentation (manufacturer, model, power, image_url, price, popularity)
values ('Corsair', 'RM Series RM750', 750, 'https://static.digitecgalaxus.ch/Files/5/0/2/4/0/7/7/284712.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 129.0, 2);
insert into alimentation (manufacturer, model, power, image_url, price, popularity)
values ('Corsair', 'VS650', 650, 'https://static.digitecgalaxus.ch/Files/5/2/1/0/6/4/1/vs650_sideview_a_1_1_1.png?fit=inside%7C464:368&output-format=progressive-jpeg', 65.10, 5);
insert into alimentation (manufacturer, model, power, image_url, price, popularity)
values ('be quiet!', 'Dark Power Pro 11', 850, 'https://static.digitecgalaxus.ch/Files/5/1/6/1/0/7/9/FileServer.php?fit=inside%7C441:299&output-format=progressive-jpeg', 225.0, 8);
insert into alimentation (manufacturer, model, power, image_url, price, popularity)
values ('Super Flower', 'Golden Green HX Gold', 350, 'https://static.digitecgalaxus.ch/Files/5/0/3/5/4/5/7/15902_0__nesf_018_1g.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 73.0, 5);
insert into alimentation (manufacturer, model, power, image_url, price, popularity)
values ('Seasonic', 'G-450', 450, 'https://static.digitecgalaxus.ch/Files/7/2/7/8/3/9/SSR-450RM-2.jpg?fit=inside%7C464:368&output-format=progressive-jpeg', 83.6, 3);




# --- !Downs
delete from motherboard;