import AboutYou from './components/AboutYou';
import EmailVerify from './components/EmailVerify';
import Auth from './components/Auth';
import PageContentBox from '@/src/components/Layout/PageContentBox';
import PageLayout from '@/src/components/Layout/PageLayout';
import { Stack } from '@mui/material';

const SettingPageView = ({ data, mutate }) => {
  return (
    <PageLayout title='Settings'>
      <PageContentBox>
        {data?.user ? (
          <Stack spacing={3}>
            <EmailVerify user={data.user} />
            <AboutYou user={data.user} mutate={mutate} />
            <Auth user={data.user} />
          </Stack>
        ) : null}
      </PageContentBox>
    </PageLayout>
  );
};

export default SettingPageView;
