import Link from 'next/link';
import PageLayout from '@/src/components/Layout/PageLayout';
import PageContentBox from '@/src/components/Layout/PageContentBox';
import { Button, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const ResetPasswordTokenPageView = ({ valid, passwordRef, status, onSubmit }) => {
  return (
    <PageLayout title='Reset Password'>
      <PageContentBox>
        <Stack alignItems='center' spacing={3} maxWidth='400px' sx={{ margin: '0 auto' }}>
          {valid ? (
            <>
              {status === 'success' ? (
                <Typography variant='subtitle1'>Your password has been updated successfully.</Typography>
              ) : (
                <>
                  <Typography variant='subtitle1'>Enter a new password for your account</Typography>
                  <Stack component='form' spacing={3} onSubmit={onSubmit} justifyContent='center' width='100%'>
                    <TextField
                      label='New password'
                      inputRef={passwordRef}
                      type='password'
                      aria-autocomplete='both'
                      aria-label='new-password'
                      required
                    />
                    <LoadingButton loading={status === 'loading'} type='submit' variant='contained'>
                      Reset Password
                    </LoadingButton>
                  </Stack>
                </>
              )}
              <Link href='/auth/login' passHref>
                <Button variant='outlined'>Return to login</Button>
              </Link>
            </>
          ) : (
            <>
              <Typography variant='h2'>Invalid Link</Typography>
              <Typography variant='subtitle1' textAlign='center'>
                It looks like you may have clicked on an invalid link. Please close this window and try again.
              </Typography>
              <Link href='/auth/login' passHref>
                <Button variant='contained'>Return to login</Button>
              </Link>
            </>
          )}
        </Stack>
      </PageContentBox>
    </PageLayout>
  );
};

export default ResetPasswordTokenPageView;
