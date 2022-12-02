const Header = ({ header }) => <h2>{header}</h2>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>


const Course = ({ course }) => {
    
    // helper function 
    const sumOfExercises = course.parts.reduce((sum, part) =>
    sum + part.exercises, 0)


  return (
    <div>
        <Header header={course.name} />
        <Content parts={course.parts} />
        <p>
            <strong>
                total of {sumOfExercises} exercises
            </strong>
        </p>
    </div>
  )
}

export default Course
