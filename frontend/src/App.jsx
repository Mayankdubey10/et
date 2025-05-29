import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Box, Typography, TextField, Button, List, 
  ListItem, Paper, MenuItem, Select, FormControl, 
  InputLabel, Grid, Card, CardContent, Divider 
} from '@mui/material';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: '',
    user_id: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchUsers();
    fetchExpenses();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/expenses/`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/users/`, newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  const handleCreateExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/expenses/`, {
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        user_id: parseInt(newExpense.user_id),
        date: new Date(newExpense.date).toISOString()
      });
      setNewExpense({
        title: '',
        amount: '',
        category: '',
        user_id: '',
        date: new Date().toISOString().split('T')[0]
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1976d2', mb: 4 }}>
          Expense Tracker
        </Typography>

        <Grid container spacing={3}>
          {/* User Creation Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
                Create User
              </Typography>
              <Box component="form" onSubmit={handleCreateUser} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ mt: 2, width: '100%' }}
                >
                  Create User
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Expense Creation Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
                Create Expense
              </Typography>
              <Box component="form" onSubmit={handleCreateExpense} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: '$'
                  }}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newExpense.category}
                    label="Category"
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  >
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Transportation">Transportation</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                    <MenuItem value="Shopping">Shopping</MenuItem>
                    <MenuItem value="Utilities">Utilities</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>User</InputLabel>
                  <Select
                    value={newExpense.user_id}
                    label="User"
                    onChange={(e) => setNewExpense({ ...newExpense, user_id: e.target.value })}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ mt: 2, width: '100%' }}
                >
                  Create Expense
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Users List Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
                Users
              </Typography>
              <List>
                {users.map((user) => (
                  <Card key={user.id} sx={{ mb: 1 }}>
                    <CardContent>
                      <Typography variant="h6">{user.name}</Typography>
                      <Typography color="textSecondary">{user.email}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Expenses List Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
                Expenses
              </Typography>
              <List>
                {expenses.map((expense) => (
                  <Card key={expense.id} sx={{ mb: 1 }}>
                    <CardContent>
                      <Typography variant="h6">{expense.title}</Typography>
                      <Typography color="textSecondary">
                        Amount: ${expense.amount.toFixed(2)}
                      </Typography>
                      <Typography color="textSecondary">
                        Category: {expense.category}
                      </Typography>
                      <Typography color="textSecondary">
                        User: {users.find(u => u.id === expense.user_id)?.name || expense.user_id}
                      </Typography>
                      <Typography color="textSecondary">
                        Date: {new Date(expense.date).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
