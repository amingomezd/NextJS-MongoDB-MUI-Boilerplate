import { useCallback, useRef, useState } from 'react';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';
import ChangePasswordView from './ChangePasswordView';

const ChangePassword = () => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetcher('/api/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: oldPasswordRef.current.value,
          newPassword: newPasswordRef.current.value
        })
      });
      toast.success('Your password has been updated');
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoading(false);
      oldPasswordRef.current.value = '';
      newPasswordRef.current.value = '';
    }
  }, []);

  return (
    <ChangePasswordView
      isLoading={isLoading}
      onSubmit={onSubmit}
      oldPasswordRef={oldPasswordRef}
      newPasswordRef={newPasswordRef}
    />
  );
};

export default ChangePassword;
