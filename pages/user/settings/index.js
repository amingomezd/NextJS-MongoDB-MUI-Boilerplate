import { useCurrentUser } from '@/src/hooks/userHooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SettingPageView from './SettingPageView';

const SettingPage = () => {
  const { data, error } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!data && !error) return;
    if (!data.user && router.isReady) {
      router.replace('/auth/login');
    }
  }, [router, data, error]);

  return <SettingPageView data={data} />;
};

export default SettingPage;
