const express = require('express');
const db = require('./db'); // Ensure this connects to your database
const router = express.Router();

// Endpoint to place an order
router.post('/orders', (req, res) => {
  const { customerID, menuItems } = req.body;

  console.log('Received order data:', JSON.stringify(req.body, null, 2));

  if (!customerID || !Array.isArray(menuItems) || menuItems.length === 0) {
    console.error('Invalid input data. CustomerID and menuItems are required.');
    return res.status(400).json({ error: 'Invalid input data. CustomerID and menuItems are required.' });
  }

  db.query('SELECT * FROM customer WHERE CustomerID = ?', [customerID], (err, result) => {
    if (err) {
      console.error('Database error during customer validation:', err);
      return res.status(500).json({ error: 'Database error during customer validation' });
    }

    if (result.length === 0) {
      console.error('CustomerID does not exist:', customerID);
      return res.status(400).json({ error: 'CustomerID does not exist.' });
    }

    const orderDate = new Date();

    db.query(
      'INSERT INTO orders (CustomerID, OrderDate, OrderStatus) VALUES (?, ?, ?)',
      [customerID, orderDate, 0],
      (err, result) => {
        if (err) {
          console.error('Database error during order placement:', err);
          return res.status(500).json({ error: 'Database error during order placement' });
        }

        const orderID = result.insertId;

        const menuIDs = menuItems.map(item => item.MenuOfTheDayID);
        db.query(
          'SELECT MenuOfTheDayID FROM menuoftheday WHERE MenuOfTheDayID IN (?)',
          [menuIDs],
          (err, result) => {
            if (err) {
              console.error('Error validating menu items:', err);
              return res.status(500).json({ error: 'Error validating menu items' });
            }

            const validMenuIDs = result.map(row => row.MenuOfTheDayID);
            const invalidItems = menuItems.filter(item => !validMenuIDs.includes(item.MenuOfTheDayID));

            if (invalidItems.length > 0) {
              console.error('Invalid menu items detected:', invalidItems);
              return res.status(400).json({ error: 'Some menu items are invalid', invalidItems });
            }

            const orderItems = menuItems.map(item => [
              null, // Auto-increment OrderItemID
              orderID,
              item.MenuOfTheDayID,
              item.Quantity,
            ]);

            db.query(
              'INSERT INTO orderitems (OrderItemID, OrderID, MenuOfTheDayID, Quantity) VALUES ?',
              [orderItems],
              (err, result) => {
                if (err) {
                  console.error('Failed to insert order items:', err);
                  return res.status(500).json({ error: 'Failed to insert order items' });
                }

                return res.status(200).json({ message: 'Order placed successfully', orderID });
              }
            );
          }
        );
      }
    );
  });
});


// Endpoint to get order details by order ID or all orders if no ID is specified
router.get('/orders/:orderID?', (req, res) => {
  const orderID = req.params.orderID;

  let query = `
    SELECT 
      o.OrderID, 
      o.OrderDate, 
      o.OrderStatus, 
      c.CustomerID, 
      c.FirstName, 
      c.LastName, 
      oi.OrderItemID,
      oi.Quantity, 
      m.MenuOfTheDayID, 
      menu.ItemName, 
      menu.Price
    FROM orders o
    JOIN customer c ON o.CustomerID = c.CustomerID
    LEFT JOIN orderitems oi ON o.OrderID = oi.OrderID
    LEFT JOIN menuoftheday m ON oi.MenuOfTheDayID = m.MenuOfTheDayID
    LEFT JOIN menu ON m.MenuItemID = menu.MenuItemID
  `;

  const queryParams = [];

  if (orderID) {
    query += ` WHERE o.OrderID = ?`;
    queryParams.push(orderID);
  }

  query += ` ORDER BY o.OrderDate DESC, oi.OrderItemID`;

  console.log('Executing query:', query, 'with parameters:', queryParams);

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching order details:', err);
      return res.status(500).json({ error: 'Error fetching order details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: orderID ? 'Order not found' : 'No orders found' });
    }

    // Process the results to structure the response
    const orders = {};

    results.forEach(row => {
      if (!orders[row.OrderID]) {
        orders[row.OrderID] = {
          orderID: row.OrderID,
          orderDate: row.OrderDate,
          orderStatus: row.OrderStatus,
          customer: {
            customerID: row.CustomerID,
            firstName: row.FirstName,
            lastName: row.LastName,
          },
          items: [],
        };
      }

      if (row.OrderItemID) {
        orders[row.OrderID].items.push({
          orderItemID: row.OrderItemID,
          quantity: row.Quantity,
          menuOfTheDayID: row.MenuOfTheDayID,
          itemName: row.ItemName,
          price: row.Price,
        });
      }
    });

    if (orderID) {
      // Send details of a single order
      console.log('Fetched order details:', JSON.stringify(orders[orderID], null, 2));
      return res.status(200).json(orders[orderID]);
    } else {
      // Send details of all orders
      console.log('Fetched all orders:', JSON.stringify(Object.values(orders), null, 2));
      return res.status(200).json(Object.values(orders));
    }
  });
});

module.exports = router;
