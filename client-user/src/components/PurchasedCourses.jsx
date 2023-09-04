import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import "../index.css";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Main, openState } from "./AppNavBar";
import "./coursesStyles.css";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

function PurchasedCourses() {
  const [open] = useRecoilState(openState);
  const [purCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://jeysiva-learn-academy-server.vercel.app/users/purchasedCourses",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setPurchasedCourses(res.data.purchasedCourses);
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
              marginLeft: "230px",
            }}
          >
            Purchased Courses
          </Typography>
          <div className="all-courses">
            {purCourses.length > 0
              ? purCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              : "No course has yet been bought!"}
          </div>
        </Main>
      )}
    </>
  );
}

export default PurchasedCourses;
