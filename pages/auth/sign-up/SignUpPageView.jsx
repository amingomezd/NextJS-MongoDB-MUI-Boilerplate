import Link from 'next/link';
import PageLayout from '@/src/components/Layout/PageLayout';
import PageContentBox from '@/src/components/Layout/PageContentBox';
import { Divider, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const SignUpPageView = ({ isLoading, onSubmit, nameRef, emailRef, passwordRef, usernameRef }) => {
  return (
    <PageLayout title='Join Now'>
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
            <Typography variant='h6'>Your login</Typography>
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

          <Stack spacing={1}>
            <Typography variant='h6'>About you</Typography>
            <TextField
              label='Username'
              inputRef={usernameRef}
              type='text'
              aria-autocomplete='both'
              aria-label='Username'
              required
              sx={{ width: '100%' }}
            />
            <TextField
              label='Full name'
              inputRef={nameRef}
              type='text'
              aria-autocomplete='both'
              aria-label='Full name'
              required
            />
          </Stack>
          <LoadingButton variant='contained' loading={isLoading} type='submit'>
            Sign up
          </LoadingButton>
        </Stack>
        <Stack spacing={2} height='100px' justifyContent='flex-end'>
          <Divider />
          <Link href='/auth/login' style={{ textDecoration: 'none', textAlign: 'center' }}>
            Already have an account? Log in
          </Link>
        </Stack>
      </PageContentBox>
    </PageLayout>
  );
};

export default SignUpPageView;
