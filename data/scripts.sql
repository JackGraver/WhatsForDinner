-- SELECT restaurant_id as 'Restaurant ID', 
--                         restaurant_name as 'Name', 
--                         last_visit as 'Last Visit', 
--                         r.category_id as 'Category ID', 
--                         category_name as 'Category' 
--                     FROM restaurant as r, category as c  
--                 WHERE r.category_id = c.category_id;


-- SELECT * FROM restaurant
-- WHERE category_id IN (1,2,3)
-- ORDER BY last_visit;


SELECT 
    			r.restaurant_id,
    			r.restaurant_name,
    			last_visit,
				rating,
				GROUP_CONCAT(c.category_id, ', ') AS categories_id,
    			GROUP_CONCAT(c.category_name, ', ') AS categories
			FROM 
    			restaurant r
			JOIN 
    			restaurant_category rc ON r.restaurant_id = rc.restaurant_id
			JOIN 
    			category c ON rc.category_id = c.category_id
			GROUP BY 
    			r.restaurant_id, r.restaurant_name;