import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getLoginStatus } from '../../store/selectors';

export function PrivateRoute() {
  const isAuthUser = useSelector(getLoginStatus);
  return isAuthUser ? <Outlet /> : <Navigate to="/login" />;
}
