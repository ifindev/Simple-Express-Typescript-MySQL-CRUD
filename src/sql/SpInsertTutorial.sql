DELIMITER ;;
CREATE DEFINER=`dev`@`localhost` PROCEDURE `SpInsertTutorial`(
	title VARCHAR(255),
    description VARCHAR(255),
      published boolean
)
BEGIN
    INSERT INTO tutorials (title, description, published)
	  values (title, description, published);
END;;
DELIMITER ;