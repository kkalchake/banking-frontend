import React, { useEffect, useState } from 'react';
import { accountService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, 
  Button, IconButton, CircularProgress, Box 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.username) {
        try {
          const data = await accountService.getDetails(user.username);
          setAccounts(data);
        } catch (err) {
          console.error("Failed to fetch account info", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  // Handle case where user has no accounts yet
  const mainAccount = accounts.length > 0 ? accounts[0] : null;

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Banking App
          </Typography>
          <IconButton color="inherit" onClick={logout} aria-label="logout">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome, {user?.username}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#1976d2', color: 'white' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                  Current Balance
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', my: 2 }}>
                  {mainAccount 
                    ? `$${mainAccount.balance}` 
                    : "$0.00"}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Account: {mainAccount?.accNum || "No Account"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent>
                <Button variant="outlined" startIcon={<AccountBalanceWalletIcon />} size="large">
                  Transfer Funds
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}