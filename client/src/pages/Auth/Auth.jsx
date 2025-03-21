import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@/redux/actions/authActions";
import "./Auth.scss";
import Button from "@components/Button/";

const Auth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { loading, error, userInfo } = authState;

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    group: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login(formData.email, formData.password));
    } else {
      dispatch(
        register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.role,
          formData.group
        )
      );
    }
  };

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <h2 className="auth__title">
          {isLogin ? "Вход в систему" : "Регистрация"}
        </h2>
        {error && <p className="error">{error}</p>}
        {userInfo && (
          <p className="success">Успешно! Пользователь авторизован.</p>
        )}
        <form className="auth__form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">Имя</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Фамилия</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="role">Роль</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Студент</option>
                  <option value="teacher">Преподаватель</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="group">Группа</label>
                <input
                  type="text"
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </form>
        <div className="toggle">
          <p>
            {isLogin ? "Нет аккаунта?" : "Есть аккаунт?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
