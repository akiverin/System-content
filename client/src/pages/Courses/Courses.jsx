import React, { useEffect, useState } from "react";
import "./Courses.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../redux/actions/courseActions";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { FaPlus } from "react-icons/fa";
import CreateCourseModal from "./CreateCourseModal/CreateCourseModal";
import Button from "../../components/Button/Button";
import useCurrentUser from "../../hooks/useCurrentUser";

function Courses() {
  const dispatch = useDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const {
    allCourses: courses,
    loading,
    error,
  } = useSelector((state) => state.course);

  const { currentUser, loading: userLoading } = useCurrentUser();

  const canCreateCourse =
    currentUser &&
    (currentUser.role === "admin" || currentUser.role === "teacher");

  const canDelete = (course) => {
    return (
      currentUser &&
      (currentUser.role === "admin" || currentUser.id === course.creator)
    );
  };

  const onDelete = async (courseId) => {
    try {
      setDeletingId(courseId);
      await dispatch(deleteCourse(courseId));
      await dispatch(getAllCourses());
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle create modal
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  // Callback after course creation
  const handleCourseCreated = () => {
    setShowCreateModal(false);
    dispatch(getAllCourses());
  };

  return (
    <div className="courses">
      <div className="courses__wrapper">
        <div className="courses__header">
          <h1 className="courses__title">Курсы и материалы</h1>
          {canCreateCourse && (
            <Button onClick={handleOpenCreateModal}>
              <FaPlus /> Создать курс
            </Button>
          )}
        </div>

        {loading ||
          (userLoading && <p className="courses__loading">Загрузка...</p>)}
        {error && <p className="courses__error">Ошибка! {error}</p>}

        <ul className="courses__list">
          {courses.courses?.map((course) => (
            <li className="courses__item" key={course._id}>
              {canDelete(course) && (
                <button
                  className="courses__delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(course._id);
                  }}
                  aria-label="Удалить курс"
                  disabled={deletingId === course._id}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              )}
              <Link to={`/courses/${course._id}`}>
                <CourseCard course={course} />
              </Link>
            </li>
          ))}
        </ul>

        {showCreateModal && (
          <CreateCourseModal
            onClose={handleCloseCreateModal}
            onCourseCreated={handleCourseCreated}
          />
        )}
      </div>
    </div>
  );
}

export default Courses;
