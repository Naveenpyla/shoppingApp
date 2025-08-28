// src/pages/Orders.js
import { useState, useEffect } from "react";
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter((order) => order.userId === user.id);
    setOrders(userOrders);
  }, [user]);

  const handleCancel = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = allOrders.filter((order) => order.orderId !== orderId);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders.filter((order) => order.userId === user.id));
  };

  if (orders.length === 0)
    return <Typography sx={{ mt: 5, textAlign: "center" }}>You have no orders</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
      {orders.map((order) => (
        <Card key={order.orderId} sx={{ display: "flex", alignItems: "center" }}>
          <CardMedia component="img" image={order.image} alt={order.title} sx={{ width: 100, height: 100, objectFit: "contain", m: 1 }} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{order.title}</Typography>
            <Typography>Price: ${order.price}</Typography>
            <Typography>Quantity: {order.quantity}</Typography>
            <Typography>Shipping: {order.address}</Typography>
            <Typography>Payment: {order.payment}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="error" onClick={() => handleCancel(order.orderId)}>
              Cancel Order
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Orders;
