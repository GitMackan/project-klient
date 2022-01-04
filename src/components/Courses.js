import React from 'react'

fetch('http://localhost:5000/courses')
    .then(res => res.json())
    .then(data => {
      const courseName = data.courseName;
    })


const Courses = () => {
    return (
        <div>
            
        </div>
    )
}

export default Courses
