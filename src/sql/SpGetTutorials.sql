DELIMITER $$

CREATE PROCEDURE SpGetTutorials
(
	 titleTut VARCHAR(100),
	offsetNum INT,
	limitNum INT,
       statementType varchar(100)
)
BEGIN
	IF StatementType = 'get_data' THEN

		SELECT * FROM tutorials WHERE
		title LIKE CONCAT('%',titleTut,'%')

		ORDER BY id

	   LIMIT limitNum OFFSET offsetNum;

	ELSEIF statementType = 'get_count' THEN
		SELECT COUNT(*) AS CountTut FROM tutorials WHERE
		 title LIKE CONCAT('%',title,'%');
	END IF;

END$$

DELIMITER ;