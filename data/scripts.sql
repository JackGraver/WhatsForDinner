SELECT restaurant_id as 'Restaurant ID', 
                        restaurant_name as 'Name', 
                        last_visit as 'Last Visit', 
                        r.category_id as 'Category ID', 
                        category_name as 'Category' 
                    FROM restaurant as r, category as c  
                WHERE r.category_id = c.category_id;


SELECT * FROM restaurant
ORDER BY last_visit;t