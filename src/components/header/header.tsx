import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout } from '../../store/actions';
import { getLoginStatus, getUser } from '../../store/selectors';

function Header(): JSX.Element {
  const isLogin = useSelector(getLoginStatus);
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onLoginClick(evt: MouseEvent) {
    evt.preventDefault();
    navigate('/login');
  }

  function onLogoutClick(evt: MouseEvent) {
    evt.preventDefault();
    dispatch(logout());
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo logo">
        Movie Buff
      </Link>
      <section className="header__profile profile">
        {isLogin && (
          <>
            <p className="profile__name">{user?.email}</p>
            <img
              className="profile__avatar"
              src="images/bitmap@2x.png"
              alt="Avatar"
              width="35"
              height="35"
            />
          </>
        )}
        <a href="/" className="login_button" onClick={isLogin ? onLogoutClick : onLoginClick}>
          {isLogin ? 'Выйти' : 'Войти'}
        </a>
      </section>
    </header>
  );
}

export default Header;
