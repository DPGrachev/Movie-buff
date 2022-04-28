import { MouseEvent, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { login } from "../../store/actions";
import storage from '../../services/storage';
import { UserData } from "../../types/user-data";

type Props = {
  closeForm: () => void,
}

export function LoginForm({closeForm} : Props): JSX.Element {
  const [isRegistration, setIsRegistration] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function changeForm (evt: MouseEvent) {
    evt.preventDefault();
    setIsRegistration((prevState) => !prevState);
    setErrorMessage('');
  }

  function UserLogin (evt: MouseEvent) {
    evt.preventDefault();
    const userEmail = emailField.current?.value.toLowerCase() as string;
    const userPassword = passwordField.current?.value as string;

    if( !form.current?.reportValidity() ) {
      return;
    }

    try {
      const user = storage.getUser(userEmail, userPassword);
      dispatch(login(user));
      closeForm();
    } catch {
      setErrorMessage('Неверная почта или пароль');
    }
  }

  function registration (evt: MouseEvent) {
    evt.preventDefault();
    const userEmail = emailField.current?.value.toLowerCase() as string;
    const userPassword = passwordField.current?.value as string;

    if( !form.current?.reportValidity() ) {
      return;
    }

    try {
      const userData: UserData = {
        email: userEmail,
        password: userPassword,
        favorites: [],
        history: [],
        watchlist: [],
      };
      storage.setUser(userData);
      dispatch(login(userData));
      closeForm();
    } catch {
      setErrorMessage('Пользователь с такой почтой уже существует');
    }
    
  }

  return (
    <section className="film-details">
        <div className="film-details__top-container">
          <div className="film-details__close">
            <button className="film-details__close-btn" type="button" onClick={closeForm}>close</button>
          </div>
          <div className="login_option_buttons">
            <h1>{isRegistration ? 'Регистрация' : 'Авторизация'}</h1>
          </div>
          <form ref={form} className="login_form" action="" method="get">
            <label htmlFor="email">Электронная почта</label>
            <input ref={emailField} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="login_form__email_input"id='email' type={'email'} required />
            <label htmlFor="password">Пароль</label>
            <input ref={passwordField} className="login_form__password_input" id='password' type={'password'} minLength={6} required />
            
            <button className="login_form__submit" type="submit" onClick={ isRegistration? registration : UserLogin }>{isRegistration ? 'Зарегистрироваться' : 'Войти'}</button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
        <div className="login_text">
          <p>{isRegistration ? 'Есть аккаунт?' : 'Нет аккаунта?'}<a href='/' className="login_text_span" onClick={changeForm}>{isRegistration ? ' Войти' : ' Зарегистрироваться'}</a></p>
        </div>
    </section>
  );
}

