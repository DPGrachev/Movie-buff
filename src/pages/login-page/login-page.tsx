import { MouseEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import storage from '../../services/storage';
import { UserData } from '../../types/user-data';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/user-data/user-data';
import { AppRoutes } from '../../const';

const EMAIL_PATTERN = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

export function LoginPage(): JSX.Element {
  const [isRegistration, setIsRegistration] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function changeForm(evt: MouseEvent) {
    evt.preventDefault();
    setIsRegistration((prevState) => !prevState);
    setErrorMessage('');
  }

  function navigateAfterLogin() {
    if (window.history.state && window.history.state.idx > 1) {
      navigate(-2);
    } else {
      navigate(AppRoutes.Main);
    }
  }

  function UserLogin(evt: MouseEvent) {
    evt.preventDefault();
    const userEmail = emailField.current?.value.toLowerCase() as string;
    const userPassword = passwordField.current?.value as string;

    if (!form.current?.reportValidity()) {
      return;
    }

    try {
      const user = storage.getUser(userEmail, userPassword);
      dispatch(login(user));
      navigateAfterLogin();
    } catch {
      setErrorMessage('Неверная почта или пароль');
    }
  }

  function registration(evt: MouseEvent) {
    evt.preventDefault();
    const userEmail = emailField.current?.value.toLowerCase() as string;
    const userPassword = passwordField.current?.value as string;

    if (!form.current?.reportValidity()) {
      return;
    }

    try {
      const userData: UserData = {
        email: userEmail,
        password: userPassword,
        searchHistory: [],
        favorites: [],
        history: [],
        watchlist: [],
      };
      storage.setUser(userData);
      dispatch(login(userData));
      navigateAfterLogin();
    } catch {
      setErrorMessage('Пользователь с такой почтой уже существует');
    }
  }

  return (
    <main>
      <section className="login-section">
        <div>
          <div className="film-details__top-container">
            <div className="login_option_buttons">
              <h1>{isRegistration ? 'Регистрация' : 'Авторизация'}</h1>
            </div>
            <form ref={form} className="login_form" action="" method="get">
              <label htmlFor="email">Электронная почта</label>
              <input
                ref={emailField}
                pattern={EMAIL_PATTERN}
                className="login_form__email_input"
                id="email"
                type={'email'}
                required
              />
              <label htmlFor="password">Пароль</label>
              <input
                ref={passwordField}
                className="login_form__password_input"
                id="password"
                type={'password'}
                minLength={6}
                required
              />

              <button
                className="login_form__submit"
                type="submit"
                onClick={isRegistration ? registration : UserLogin}
              >
                {isRegistration ? 'Зарегистрироваться' : 'Войти'}
              </button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          </div>
          <div className="login_text">
            <p>
              {isRegistration ? 'Есть аккаунт?' : 'Нет аккаунта?'}
              <a href="/" className="login_text_span" onClick={changeForm}>
                {isRegistration ? ' Войти' : ' Зарегистрироваться'}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
