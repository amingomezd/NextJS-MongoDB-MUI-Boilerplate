import Link from 'next/link';
import PageLayout from '@/src/components/Layout/PageLayout';
import PageContentBox from '@/src/components/Layout/PageContentBox';
import { Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

const ForgetPasswordPageView = ({ status, email, onSubmit, emailRef }) => {
  return (
    <PageLayout title='Forget Password'>
      <PageContentBox>
        {status === 'success' ? (
          <Box textAlign='center'>
            <Typography variant='h2'>Check your inbox</Typography>
            <Typography variant='subtitle1'>
              An email has been sent to <a href={`mailto:${email}`}>{email}</a>. Please follow the link in that email to
              reset your password.
            </Typography>
          </Box>
        ) : (
          <Box textAlign='center'>
            <Typography variant='subtitle1' mb={3}>
              Enter the email address associated with your account, and we will send you a link to reset your password.
            </Typography>
            <Stack
              component='form'
              spacing={3}
              onSubmit={onSubmit}
              maxWidth='400px'
              justifyContent='center'
              sx={{ margin: '0 auto' }}
            >
              <TextField
                label='Email Address'
                inputRef={emailRef}
                type='email'
                aria-autocomplete='both'
                aria-label='Email Address'
                required
                sx={{ width: '100%' }}
              />
              <LoadingButton variant='contained' loading={status === 'loading'} type='submit'>
                Continue
              </LoadingButton>
            </Stack>
          </Box>
        )}
        <Box textAlign='center' mt={3}>
          <Link href='/auth/login' style={{ textDecoration: 'none', textAlign: 'center' }}>
            Return to login
          </Link>
        </Box>
      </PageContentBox>
    </PageLayout>
  );
};

export default ForgetPasswordPageView;
