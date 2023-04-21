import { Card, CardActions, CardContent, CardHeader, IconButton, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';

const AboutYouView = ({
  user,
  avatarHref,
  usernameRef,
  nameRef,
  bioRef,
  profilePictureRef,
  onAvatarChange,
  onSubmit,
  isLoading
}) => {
  return (
    <Card elevation={1} component='form' onSubmit={onSubmit}>
      <CardHeader title='About You' />
      <CardContent component={Stack} spacing={2}>
        <TextField label='Your Username' inputRef={usernameRef} aria-label='Username' />
        <TextField label='Your Name' inputRef={nameRef} aria-label='Name' />
        <TextField label='Your Bio' inputRef={bioRef} multiline rows={4} />

        <Typography variant='h6'>Your Avatar</Typography>
        <IconButton sx={{ width: 'fit-content' }} component='label'>
          <input
            hidden
            aria-label='Your Avatar'
            type='file'
            accept='image/*'
            ref={profilePictureRef}
            onChange={onAvatarChange}
          />
          <Avatar src={avatarHref} alt={user.username} sx={{ width: '100px', height: '100px' }} />
        </IconButton>
      </CardContent>
      <CardActions>
        <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
          Save
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default AboutYouView;
