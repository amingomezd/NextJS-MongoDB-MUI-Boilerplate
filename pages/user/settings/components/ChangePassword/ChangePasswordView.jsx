import { Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const ChangePasswordView = ({ isLoading, onSubmit, oldPasswordRef, newPasswordRef }) => {
  return (
    <Card elevation={1} component='form' onSubmit={onSubmit}>
      <CardHeader title='Password' />
      <CardContent component={Stack} spacing={2}>
        <TextField
          label='Old Password'
          inputRef={oldPasswordRef}
          type='password'
          aria-autocomplete='both'
          aria-label='current-password'
        />
        <TextField
          label='New Password'
          inputRef={newPasswordRef}
          type='password'
          aria-autocomplete='both'
          aria-label='new-password'
        />
      </CardContent>
      <CardActions>
        <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
          Save
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default ChangePasswordView;
