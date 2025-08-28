// src/pages/Cart.js
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, TextField, Modal } from "@mui/material";
import { removeItem } from "../slices/cartSlice";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleOrder = () => {
    if (!address) return alert("Please enter your address");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrders = cartItems.map((item) => ({
      ...item,
      userId: user.id,
      address,
      payment: "Cash on Delivery",
      orderId: Date.now() + Math.random(),
    }));

    localStorage.setItem("orders", JSON.stringify([...orders, ...newOrders]));

    // Clear cart
    cartItems.forEach((item) => dispatch(removeItem(item.id)));
    setAddress("");
    setOpenModal(false);
    alert("Order placed successfully!");
  };

  if (cartItems.length === 0)
    return <Typography sx={{ mt: 5, textAlign: "center" }}>Your cart is empty</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
      {cartItems.map((item) => (
        <Card key={item.id} sx={{ display: "flex", alignItems: "center" }}>
          <CardMedia component="img" image={item.image} alt={item.title} sx={{ width: 100, height: 100, objectFit: "contain", m: 1 }} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>Price: ${item.price}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="error" onClick={() => handleRemove(item.id)}>Remove</Button>
          </CardActions>
        </Card>
      ))}

      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Place Order
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#fff", p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Enter Shipping Address</Typography>
          <TextField
            label="Address"
            multiline
            rows={3}
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOrder}>
            Confirm Order (COD)
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Cart;
