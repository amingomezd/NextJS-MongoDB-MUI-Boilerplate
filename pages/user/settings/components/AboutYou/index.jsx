import { useCallback, useEffect, useRef, useState } from 'react';
import { fetcher } from '@/src/common/utils/fetch';
import toast from 'react-hot-toast';
import AboutYouView from './AboutYouView';
import { useCurrentUser } from '@/src/hooks/userHooks';

const AboutYou = ({ user }) => {
  const usernameRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();
  const profilePictureRef = useRef();
  const [avatarHref, setAvatarHref] = useState(user.profilePicture);
  const { mutate } = useCurrentUser();

  const onAvatarChange = useCallback((e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (l) => {
      setAvatarHref(l.currentTarget.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const formData = new FormData();
        if (usernameRef.current.value !== user.username) {
          formData.append('username', usernameRef.current.value);
        }
        if (nameRef.current.value !== user.name) {
          formData.append('name', nameRef.current.value);
        }
        if (bioRef.current.value !== user.bio) {
          formData.append('bio', bioRef.current.value);
        }
        if (profilePictureRef.current.files[0]) {
          formData.append('profilePicture', profilePictureRef.current.files[0]);
        }

        const response = await fetcher('/api/user', {
          method: 'PATCH',
          body: formData
        });

        mutate({ user: response.user }, false);
        toast.success('Your profile has been updated');
      } catch (e) {
        toast.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  useEffect(() => {
    usernameRef.current.value = user.username;
    nameRef.current.value = user.name;
    bioRef.current.value = user.bio;
    profilePictureRef.current.value = '';
    setAvatarHref(user.profilePicture);
  }, [user]);

  return (
    <AboutYouView
      user={user}
      avatarHref={avatarHref}
      usernameRef={usernameRef}
      nameRef={nameRef}
      bioRef={bioRef}
      profilePictureRef={profilePictureRef}
      onAvatarChange={onAvatarChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default AboutYou;
