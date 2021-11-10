import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    about: {
      display: "flex",
      justifyContent: "center",
    },
    h1: {
      marginLeft: 150,
      marginTop: 100,
      fontFamily: "Verdana",
      fontSize: 61,
      fontWeight: "lighter",
    },
    p: { width: "50%", fontSize: 20, marginLeft: 150 },
  };
});

export default function AboutContent() {
  const root = useStyles();
  return (
    <div className={root.about}>
      <div>
        <h1 className={root.h1}> About Us </h1>
        <br />
        <p className={root.p}>
          <p style={{ fontStyle: "oblique" }}>
            Changing learning for the better
          </p>
          <br />
          Whether you want to learn or to share what you know, you’ve come to
          the right place.
          <br />
          <br />
          As a global destination for online learning, we connect people through
          knowledge.
          <br />
          <br />
          On our website you can find any course you are interested in. At the
          same time, you can share your courses and empower other people to
          acquire a new profession.
          <br />
          <br />
          We envision a world where anyone, anywhere has the power to transform
          their life through learning.
        </p>
      </div>
    </div>
  );
}
