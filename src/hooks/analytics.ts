import { logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../configs/firebase';

export function useFirebaseRoutesAnalytics() {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_location: location.pathname,
    });
  }, [location]);

  return null;
}
