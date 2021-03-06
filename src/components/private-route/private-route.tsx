import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getLoginStatus } from '../../store/selectors';

export function PrivateRoute() {
  const isAuthUser = useSelector(getLoginStatus);
  return isAuthUser ? <Outlet /> : <Navigate to="/login" />;
}
