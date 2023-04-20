import { Card, CardContent, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const EmailVerifyView = ({ user, status, verify }) => {
  return (
    <Card elevation={1}>
      <CardContent component={Stack} direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='body1'>
          <strong>Note:</strong> Your email{' '}
          <Typography component='span' color='secondary'>
            ({user.email}){' '}
          </Typography>
          is {status === 'success' ? 'verified' : 'unverified'}.
        </Typography>
        <LoadingButton
          variant='contained'
          loading={status === 'loading'}
          size='small'
          onClick={verify}
          disabled={status === 'success'}
        >
          Verify
        </LoadingButton>
      </CardContent>
    </Card>
  );
};

export default EmailVerifyView;
