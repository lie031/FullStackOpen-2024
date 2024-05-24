const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  );
}
const Part = (props) => {
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  );
}

const Content = (props) => {
  console.log(props)
  const { parts } = props.course; 
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
}

const Total = (props) => {
  const { parts } = props.course; 
  return (
    <p>
      Number of exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
}

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of react",
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} /> 
      <Total course={course} /> 
    </>
  );
}

export default App;