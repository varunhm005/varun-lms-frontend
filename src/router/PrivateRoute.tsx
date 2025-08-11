import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenLoading from '../components/loading/FullScreenLoading';
import { Permissions } from '../configs/permissions';
import { route } from '../constants/routes';
import { useFirebaseContext } from '../context/firebase-user-context';
import { useGetUserPermissions } from '../hooks/auth-hook';

interface Props extends PropsWithChildren {
  permissions: Permissions[];
}

export default function PrivateRoute(props: Props) {
  const { permissions } = props;
  const userPermissions = useGetUserPermissions();
  const [loadingPermissions, setLoadingPermissions] = useState(true);

  const { user, initializing } = useFirebaseContext();
  const { children } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !initializing) {
      navigate('/login', {
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initializing]);

  useEffect(() => {
    if (permissions && permissions.length > 0) {
      if (userPermissions) {
        const hasPermission = permissions.some((permission) =>
          userPermissions.includes(permission)
        );

        if (!hasPermission) {
          navigate(`/${route.dashboard}`, {
            replace: true,
          });
        }
      }
    }
    setLoadingPermissions(false);
  }, [navigate, permissions, userPermissions]);

  if (initializing) {
    return null;
  }

  if (loadingPermissions) {
    return <FullScreenLoading />;
  }

  return children;
}
