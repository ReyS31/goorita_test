import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import authService from 'src/services/auth.service';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SingUpView() {
  const theme = useTheme();

  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    setDisabled(true);
    if (user.email === '' || user.name === '' || user.password === '') {
      setMessage('There is empty field');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      setDisabled(false);
      return;
    }
    authService
      .register(user)
      .then((res) => router.replace('/'))
      .catch((e) => setMessage(e.response.data.message));
    setDisabled(false);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        {message && (
          <Alert variant="outlined" severity="error">
            {message}
          </Alert>
        )}
        <TextField
          name="name"
          label="Name"
          onChange={(e) => setUser((u) => ({ ...u, name: e.target.value }))}
        />

        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) =>
            setUser((u) => ({
              ...u,
              password: e.target.value,
              password_confirmation: e.target.value,
            }))
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />

      <LoadingButton
        disabled={disabled}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign Up</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/login">
              Sign In
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
