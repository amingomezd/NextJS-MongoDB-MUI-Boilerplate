import Link from 'next/link';
import PageLayout from '@/components/Layout/PageLayout';
import PageContentBox from '@/components/Layout/PageContentBox';
import { Divider, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginPageView = ({ isLoading, onSubmit, emailRef, passwordRef }) => {
  return (
    <PageLayout title='Login to app'>
      <PageContentBox>
        <Stack
          component='form'
          spacing={3}
          onSubmit={onSubmit}
          maxWidth='400px'
          justifyContent='center'
          sx={{ margin: '0 auto' }}
        >
          <Stack spacing={1}>
            <TextField
              label='Email Address'
              inputRef={emailRef}
              type='email'
              aria-autocomplete='both'
              aria-label='Email Address'
              required
              sx={{ width: '100%' }}
            />
            <TextField
              label='Password'
              inputRef={passwordRef}
              type='password'
              aria-autocomplete='both'
              aria-label='Password'
              required
            />
          </Stack>
          <LoadingButton variant='contained' loading={isLoading}>
            Log in
          </LoadingButton>
          <Link href='/index.page' style={{ textDecoration: 'none', textAlign: 'center' }}>
            Forget password?
          </Link>
        </Stack>
        <Stack spacing={2} height='200px' justifyContent='flex-end'>
          <Divider />
          <Link href='/sign-up/index.page' style={{ textDecoration: 'none', textAlign: 'center' }}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Stack>
      </PageContentBox>
    </PageLayout>
  );
};
export default LoginPageView;
