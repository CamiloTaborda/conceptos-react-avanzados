import { lazy, Suspense, useMemo, useState, useTransition } from 'react'
import { useCourses } from './hooks/useCourses'
import './index.css'

const CourseList = lazy(() => import('./Components/CourseList'))

const App: React.FC = () => {
  const { data: courses, isLoading, error } = useCourses();
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 2;
  const [isPending, startTransition] = useTransition();

  const currentCourses = useMemo(() => {
    if (!courses) return [];

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

    return courses?.slice(indexOfFirstCourse, indexOfLastCourse);
  }, [courses, currentPage, coursesPerPage]);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!courses) return <div>No Courses Found</div>

  return (
    <section>
      <h1>Learning Courses</h1>
      <Suspense fallback={<div>Loading Courses...</div>}>
       <CourseList courses={currentCourses}/>
      </Suspense>
      <div>
        {
          Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, index) => (
            <button 
            key={index}
            onClick={() => {
              startTransition(() => {
                setCurrentPage(index + 1);
              })
            }}>
              {index + 1}
            </button>
          ))
        }
      </div>
      {isPending && <div>Loading new page...</div>}
    </section>
  )
}

export default App
