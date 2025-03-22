// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/actions/userActions";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import defaultAvatar from "@/assets/profileImage.svg";
import "./Profile.scss";
import { patchUser } from "../../redux/actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user: profile, loading, error } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    group: "",
    avatar: null,
  });

  useEffect(() => {
    if (auth.user?.userId) {
      dispatch(getUser(auth.user.userId));
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        group: profile.group,
        avatar: profile.avatar,
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(auth.user.userId, ...Object.values(formData));
    dispatch(patchUser(auth.user.userId, ...Object.values(formData)));
    setEditMode(false);
  };

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Профиль пользователя</h1>

        {loading && <p className="profile__loading">Загрузка...</p>}
        {error && <p className="profile__error">{error}</p>}

        {profile?._id && (
          <>
            <div className="profile__image-container">
              <img
                src={profile.avatar || defaultAvatar}
                alt="Аватар"
                className="profile__image"
              />
            </div>

            <div className="profile__info">
              <div className="profile__field">
                <span className="profile__label">ID:</span>
                <span className="profile__value">{profile._id}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Имя:</span>
                <span className="profile__value"> {profile.firstName}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Фамилия:</span>
                <span className="profile__value"> {profile.lastName}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Email:</span>
                <span className="profile__value"> {profile.email}</span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Группа:</span>
                <span className="profile__value">
                  {profile.group ? profile.group : "Не назначена"}
                </span>
              </div>
              <div className="profile__field">
                <span className="profile__label">Роль:</span>
                <span className="profile__value">
                  {profile.role == "student"
                    ? "Обучающийся"
                    : profile.role == "admin"
                    ? "Администратор"
                    : "Преподаватель"}
                </span>
              </div>
            </div>

            <Button
              className="profile__edit-button"
              onClick={() => setEditMode(true)}
            >
              Редактировать
            </Button>
          </>
        )}
      </div>

      <Modal
        isOpen={editMode}
        onClose={() => setEditMode(false)}
        title="Редактирование профиля"
      >
        <form className="profile__edit-form" onSubmit={handleSubmit}>
          <div className="profile__form-group">
            <label className="profile__form-label">
              Имя:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="profile__form-input"
              />
            </label>
          </div>

          <div className="profile__form-group">
            <label className="profile__form-label">
              Фамилия:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="profile__form-input"
              />
            </label>
          </div>

          <div className="profile__form-group">
            <label className="profile__form-label">
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="profile__form-input"
              />
            </label>
          </div>

          <div className="profile__form-group">
            <label className="profile__form-label">
              Аватар:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="profile__form-file"
              />
            </label>
          </div>

          <div className="profile__form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditMode(false)}
            >
              Отменить
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
