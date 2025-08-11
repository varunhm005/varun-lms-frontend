import { Course } from '../../graphql/@generated/graphql';

interface Props {
  course: Course;
}

function CourseDescription(props: Props) {
  const { course } = props;

  return (
    <div className="col-span-6">
      {course?.imageUrl && (
        <img
          src={course?.imageUrl}
          alt="course-logo"
          className="h-auto max-h-[30vh] w-full rounded-2xl object-contain"
        />
      )}
      {Boolean(course?.Summary) && (
        <>
          <h3 className="mb-2 mt-3 text-2xl font-extrabold text-black">Course Summary</h3>
          <p className="text-base font-normal text-black">{course?.Summary ?? ''}</p>
        </>
      )}
    </div>
  );
}

export default CourseDescription;
