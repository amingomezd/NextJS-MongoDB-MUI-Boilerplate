import PageLayout from '@/src/components/Layout/PageLayout';
import PageContentBox from '@/src/components/Layout/PageContentBox';
import Avatar from '@mui/material/Avatar';
import { Paper, Stack, Typography } from '@mui/material';

const UserPageView = ({ user }) => {
  return (
    <PageLayout title={`${user.name} (@${user.username})`}>
      <PageContentBox>
        <Stack component={Paper} elevation={20} p={5} spacing={1} alignItems='center'>
          <Avatar sx={{ width: '170px', height: '170px' }} alt={user.username} src={user.profilePicture} />
          <Typography variant='h4' fontWeight={700}>
            {user.name}
          </Typography>
          <Typography variant='h5' color='secondary' fontWeight={700}>
            @{user.username}
          </Typography>
          <Typography variant='subtitle2'>{user.bio}</Typography>
        </Stack>
      </PageContentBox>
    </PageLayout>
  );
};

export default UserPageView;
