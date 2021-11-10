import { makeStyles } from "@mui/styles";
import AddtoCartButton from "./AddtoCartButton";
import { useHistory } from "react-router";
import { COURSE_DESCRIPTION_ROUTE } from "../constants/Routes";

const useStyles = makeStyles(() => {
  return {
    course: {
      backgroundColor: "white",
      width: 300,
      height: 200,
      cursor: "pointer",
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    cardFooter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 10,
      paddingLeft: 10,
    },
  };
});

export default function Card({ course }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <div className={classes.course}>
        <img
          src={course.img_url}
          alt={course.name}
          style={{
            alignItems: "center",
            width: "100%",
            height: "80%",
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
          }}
          onClick={() => history.push(COURSE_DESCRIPTION_ROUTE)}
        />
        <div className={classes.cardFooter}>
          <div>
            <span>{course.price} $</span>
          </div>
          <div>
            <AddtoCartButton />
          </div>
        </div>
      </div>
    </>
  );
}
