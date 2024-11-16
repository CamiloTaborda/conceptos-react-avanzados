import { useQuery, QueryFunction } from "@tanstack/react-query";

interface Course {
    id: number;
    title: string;
    description: string;
    duration: string;
}

const fetchCourses: QueryFunction<Course[]> = async() => {
   const response = await fetch('/Api/courses.json');
   if (!response.ok) {
    throw new Error('Network response was not ok');
   }
   return response.json();
}

export const useCourses = () => {
    return useQuery<Course[], Error>({
        queryKey: ['courses'],
        queryFn: fetchCourses,
    });
};