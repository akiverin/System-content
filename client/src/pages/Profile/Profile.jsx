import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, patchUser } from "@/redux/actions/userActions";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import defaultAvatar from "@/assets/profileImage.svg";
import "./Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth.user) || {};
  const { user: profile, loading, error } = useSelector((state) => state.user);

  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState(null);

  const initialFormState = useMemo(
    () => ({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      group: profile?.group || "",
      image: null,
    }),
    [profile]
  );

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    setFormData(initialFormState);
  }, [initialFormState]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData((prev) => ({ ...prev, image: file }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await dispatch(
          patchUser(
            profile._id,
            {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              group: formData.group,
            },
            formData.image
          )
        );

        setEditMode(false);
        setLocalError(null);
      } catch (error) {
        setLocalError(error.message);
      }
    },
    [dispatch, formData, profile?._id]
  );

  const avatarUrl = useMemo(() => {
    if (preview) return preview;
    if (profile?.image) {
      return profile.image.startsWith("http")
        ? profile.image
        : `${window.location.origin}/${profile.image}`;
    }
    return defaultAvatar;
  }, [preview, profile?.image]);

  if (!profile && loading)
    return <div className="profile__loading">Загрузка...</div>;
  if (error) return <div className="profile__error">{error}</div>;

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">Профиль пользователя</h1>

        <div className="profile__image-container">
          <img
            src={`${avatarUrl}?v=${profile?.updatedAt}`}
            alt="Аватар"
            className="profile__image"
            onError={(e) => (e.target.src = defaultAvatar)}
          />
        </div>

        <div className="profile__info">
          {[
            { label: "ID:", value: profile?._id },
            { label: "Имя:", value: profile?.firstName },
            { label: "Фамилия:", value: profile?.lastName },
            { label: "Email:", value: profile?.email },
            { label: "Группа:", value: profile?.group || "Не назначена" },
            {
              label: "Роль:",
              value:
                profile?.role === "student"
                  ? "Обучающийся"
                  : profile?.role === "admin"
                  ? "Администратор"
                  : "Преподаватель",
            },
          ].map((field, index) => (
            <div key={index} className="profile__field">
              <span className="profile__label">{field.label}</span>
              <span className="profile__value">{field.value}</span>
            </div>
          ))}
        </div>

        <Button
          className="profile__edit-button"
          onClick={() => setEditMode(true)}
        >
          Редактировать
        </Button>
      </div>

      {editMode && (
        <EditProfileModal
          formData={formData}
          preview={preview}
          onClose={() => setEditMode(false)}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          error={localError}
        />
      )}
    </div>
  );
};

const EditProfileModal = React.memo(
  ({
    formData,
    preview,
    onClose,
    onSubmit,
    onInputChange,
    onFileChange,
    error,
  }) => (
    <Modal isOpen={true} onClose={onClose} title="Редактирование профиля">
      <form className="profile__edit-form" onSubmit={onSubmit}>
        {["firstName", "lastName", "email"].map((field) => (
          <div key={field} className="profile__form-group">
            <label className="profile__form-label">
              {field === "email"
                ? "Email:"
                : field === "firstName"
                ? "Имя:"
                : "Фамилия:"}
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={onInputChange}
                className="profile__form-input"
              />
            </label>
          </div>
        ))}

        {preview && (
          <div className="profile__avatar-preview">
            <img src={preview} alt="Avatar preview" />
          </div>
        )}

        <div className="profile__form-group">
          <label className="profile__form-label">
            Аватар:
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="profile__form-file"
            />
          </label>
        </div>

        {error && <div className="profile__form-error">{error}</div>}

        <div className="profile__form-actions">
          <Button type="button" variant="outline" onClick={onClose}>
            Отменить
          </Button>
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </Modal>
  )
);

export default React.memo(Profile);
