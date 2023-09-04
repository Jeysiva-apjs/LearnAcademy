import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Typography } from "@mui/material";
import "../index.css";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { Main, openState } from "./AppNavBar";
import "./coursesStyles.css";
import Skeleton from "@mui/material/Skeleton";

const coursesState = atom({
  key: "coursesState",
  default: [],
});

function ShowCourses() {
  const [courses, setCourses] = useRecoilState(coursesState);
  const [open] = useRecoilState(openState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://jeysiva-learn-academy-server.vercel.app/admin/courses/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </>
      ) : (
        <Main open={open}>
          <Typography
            variant="h4"
            component="div"
            style={{
              flexGrow: 1,
              padding: "10px",
              borderRadius: "4px",
              fontWeight: "bold",
              color: "#101460",
              textAlign: "center",
              marginTop: "70px",
              marginLeft: "210px",
            }}
          >
            Courses
          </Typography>
          <div className="all-courses">
            {courses.length > 0
              ? courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              : "Oops! Courses are still not available. Make a new course so that it can be accessed. "}
          </div>
        </Main>
      )}
    </>
  );
}

export default ShowCourses;
export { coursesState };
