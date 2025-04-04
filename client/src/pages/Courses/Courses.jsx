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
  }, []);

  const {
    allCourses: courses,
    loading,
    error,
  } = useSelector((state) => state.course);
  return (
    <div className="courses">
      <div className="courses__wrapper">
        <h1 className="courses__title">Курсы и материалы</h1>
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка! {error}</p>}
        <ul className="courses__list">
          {courses.courses?.map((course) => (
            <li className="posts__item" key={course._id}>
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
