import { setUserId, setUserProperties } from 'firebase/analytics';
import { User as FirebaseUser } from 'firebase/auth';
import React, { PropsWithChildren, useMemo, useState } from 'react';
import { analytics, auth } from '../configs/firebase';
import { client } from '../graphql/client';
import StorageService from '../services/StorageService';

type UserTypes = FirebaseUser | null;

const FirebaseContext = React.createContext<{
  user: UserTypes;
  initializing: boolean;
  logoutUser: () => void;
}>({
  user: null,
  initializing: true,
  logoutUser: () => {},
});

export default function FirebaseContextProvider(props: PropsWithChildren) {
  const { children } = props;
  const [user, setUser] = useState<UserTypes>(null);
  const [initializing, setInitializing] = useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => {
      if (_user) {
        StorageService.setUserId(_user.uid);
        setUser(_user);
        setUserId(analytics, _user.uid);
      } else {
        setUserId(analytics, null);
        setUserProperties(analytics, {});
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutUser = async () => {
    client.cache.reset();
    localStorage.clear();
    await auth.signOut();
  };

  const contextValues = useMemo(
    () => ({
      user,
      initializing,
      logoutUser,
    }),
    [user, initializing]
  );

  return <FirebaseContext.Provider value={contextValues}>{children}</FirebaseContext.Provider>;
}

export const useFirebaseContext = () => React.useContext(FirebaseContext);
