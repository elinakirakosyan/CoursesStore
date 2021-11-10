import Button from "@mui/material/Button";

export default function AddtoCartButton() {
  const onAddCourse = () => {
    alert("Course added on your cart ");
  };
  return (
    <div>
      <Button
        style={{ height: 30, backgroundColor: "rgb(220 36 36)" }}
        variant="contained"
        href="#contained-buttons"
        onClick={onAddCourse}
      >
        Add to Cart
      </Button>
    </div>
  );
}
