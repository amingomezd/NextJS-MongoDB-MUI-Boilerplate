import Link from 'next/link';
import PageLayout from '@/src/components/Layout/PageLayout';
import PageContentBox from '@/src/components/Layout/PageContentBox';
import { Button, Stack, Typography } from '@mui/material';

const EmailVerifyPageView = ({ valid }) => {
  return (
    <PageLayout title='Email verification'>
      <PageContentBox>
        <Stack spacing={10} alignItems='center'>
          <Typography variant='h4' textAlign='center' color={valid ? 'success' : 'error'}>
            {valid
              ? 'Thank you for verifying your email address. You may close this page.'
              : 'It looks like you may have clicked on an invalid link. Please close this window and try again.'}
          </Typography>
          <Link href='/' passHref>
            <Button variant='contained'>Go back home</Button>
          </Link>
        </Stack>
      </PageContentBox>
    </PageLayout>
  );
};

export default EmailVerifyPageView;
