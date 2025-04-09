import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@/redux/actions/authActions";
import "./Auth.scss";
import Button from "@components/Button/";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input/";
import { useEffect } from "react";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем данные авторизации из redux store
  const { loading, error, user } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    group: "",
  });

  // const userData = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/profile");
    }
  }, [user.isAuthenticated, navigate]);

  useEffect(() => {
    if (user.isReg) {
      dispatch(login(formData.email, formData.password));
    }
  }, [user.isReg, navigate, dispatch, formData.email, formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await dispatch(login(formData.email, formData.password));
    } else {
      await dispatch(
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
        {user.isAuthenticated && (
          <p className="success">Успешно! Пользователь авторизован.</p>
        )}
        <form className="auth__form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">Имя</label>
                <Input
                  placeholder="Имя"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Фамилия</label>
                <Input
                  placeholder="Фамилия"
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
            <label htmlFor="email">Email</label>
            <Input
              placeholder="Введите адрес электронной почты"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <Input
              placeholder="Введите пароль"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </form>
        <div className="toggle">
          <p>
            {isLogin ? "Нет аккаунта?" : "Есть аккаунт?"}{" "}
            <button type="button" onClick={() => setIsLogin((prev) => !prev)}>
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
