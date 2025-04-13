import React, { useEffect } from "react";
import "./Courses.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseActions";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

function Courses() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const {
    allCourses: courses,
    loading,
    error,
  } = useSelector((state) => state.course);

  return (
    <div className="courses">
      <div className="courses__wrapper">
        <div className="courses__header">
          <h1 className="courses__title">Курсы и материалы</h1>
        </div>

        {loading && <p className="courses__loading">Загрузка...</p>}
        {error && <p className="courses__error">Ошибка! {error}</p>}

        <ul className="courses__list">
          {courses.courses?.map((course) => (
            <li className="courses__item" key={course._id}>
              <Link to={`/courses/${course._id}`}>
                <CourseCard course={course} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Courses;
