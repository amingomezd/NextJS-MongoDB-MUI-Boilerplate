import PageLayout from '@/src/components/Layout/PageLayout';
import PageContentBox from '@/src/components/Layout/PageContentBox';
import { Button, Stack, Typography } from '@mui/material';

const Index = () => {
  return (
    <PageLayout noPadding>
      <PageContentBox>
        <Stack alignItems='center'>
          <Typography variant='h1' fontWeight={900} textAlign='center' lineHeight={1.1}>
            <span
              style={{
                background: 'linear-gradient(90deg, #7928ca, #ff0080)',
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                display: 'block'
              }}
            >
              Landing
            </span>
            <span
              style={{
                background: 'linear-gradient(90deg, rgb(110, 96, 245), rgb(131, 219, 167))',
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                display: 'block'
              }}
            >
              Page
            </span>
          </Typography>
        </Stack>
        <Stack direction='row' my={5} justifyContent='center' spacing={2}>
          <Button variant='contained'>Button 1</Button>
          <Button variant='outlined'>Button 2</Button>
        </Stack>
        <Typography variant='subtitle2' textAlign='center'>
          this is where you put a short description of your site.
        </Typography>
      </PageContentBox>
    </PageLayout>
  );
};

export default Index;
