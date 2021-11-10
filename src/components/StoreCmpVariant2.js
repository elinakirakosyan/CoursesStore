import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./Firebase";
import Card from "./Card";

const useStyles = makeStyles(() => {
  return {
    container: {
      margin: "auto",
      backgroundColor: "#e1e5e5",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 150,
      paddingBottom: 150,
      gridGap: 18,
    },
  };
});

export default function Store() {
  const [courses, setAllCourses] = useState([]);
  const classes = useStyles();

  useEffect(
    () =>
      onSnapshot(collection(db, "courses"), (snapshot) =>
        setAllCourses(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    []
  );

  return (
    <>
      <div className={classes.container}>
        {courses.map((elem) => (
          <Card course={elem} key={elem.id} />
        ))}
      </div>
    </>
  );
}
