import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../store/actions";
import { getLoginStatus, getUser } from "../../store/selectors";
import { LoginForm } from "../login-form/login-form";

function Header(): JSX.Element {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const isLogin = useSelector(getLoginStatus);
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();

  function onLoginClick (evt: MouseEvent) {
    evt.preventDefault();
    setIsLoginForm(true);
  }

  function onLogoutClick (evt: MouseEvent) {
    evt.preventDefault();
    dispatch(logout());
  }

  function closeLoginForm () {
    setIsLoginForm(false);
  }

  return (
    <>
      {isLoginForm && <LoginForm closeForm={closeLoginForm} />}
      <header className="header">
        <h1 className="header__logo logo">Movie Buff</h1>
        <section className="header__profile profile">
          {/* {isLogin 
            ? <>
                <p className="profile__name">{user?.email}</p>
                <img className="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"/>
                <a href='/' className="login_button" onClick={onLoginClick}>Выйти</a>
              </>
            : <a href='/' className="login_button" onClick={onLoginClick}>Войти</a>
          } */}
          {/* <p className="profile__name">Movie Buff</p>
          <img className="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"/> */}
          {/* <a href='/' className="login_button" onClick={onLoginClick}>Войти</a> */}
          {isLogin &&
            <>
              <p className="profile__name">{user?.email}</p>
              <img className="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"/>
            </>}
          <a href='/' className="login_button" onClick={isLogin ? onLogoutClick : onLoginClick}>{isLogin ? 'Выйти' : 'Войти'}</a>
        </section>
      </header>
    </>

  );
}

export default Header;
