import React from "react";
import courseBG from "@assets/courseBG.jpg";
import "./CourseCard.scss";

function CourseCard(props) {
  const course = props.course;
  return (
    <div className="course-card">
      {course.image ? (
        <img
          src={course.image}
          alt="Course Image"
          className="course-card__image"
        />
      ) : (
        <img src={courseBG} alt="Course Image" className="course-card__image" />
      )}
      <div className="course-card__info">
        <p className="course-card__title">{course.title}</p>
        <p className="course-card__desc">{course.desc}</p>
        {course.tags && (
          <div className="course-card__tags">
            {course.tags.map((tag, index) => (
              <p className="course-card__tag" key={index}>
                {tag}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
