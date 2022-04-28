import { UserData } from "../types/user-data";

class Storage {
  #storage;

  constructor() {
    this.#storage = localStorage;
  }

  getUser = (email: string, password: string) : UserData => {
    const data = this.#storage.getItem(email);
    const user = data ? JSON.parse(data) : null;

    if ( !user || user.password !== password) {
      throw new Error('Неверная почта или пароль');
    }
    
    return user;
  }

  setUser = (userData: UserData) => {
    const data = this.#storage.getItem(userData.email);
    const user = data ? JSON.parse(data) : null;

    if (user) {
      throw new Error('Пользователь с такой почтой уже существует');
    }

    this.#storage.setItem(userData.email, JSON.stringify(userData))
  }
}

export default new Storage();