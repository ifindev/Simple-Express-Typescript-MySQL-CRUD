CREATE TABLE IF NOT EXISTS tutorials (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  published BOOLEAN DEFAULT false
) ;

INSERT INTO tutorials (title, description, published)
values ('Fullstack Application with ReactJS and ExpressJS', 'Learning how to create a fullstack web application projet using ReactJS and ExpressJS', true)