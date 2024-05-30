const Courses = ({ courses }) => {
    return (
      <>
        {courses.map(course => (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <div>
              {course.parts.map(part => (
                <p key={part.id}>
                  {part.name}: {part.exercises}
                </p>
              ))}
              <p>
                total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
              </p>
            </div>
          </div>
        ))}
      </>
    );
  };

  export default Courses