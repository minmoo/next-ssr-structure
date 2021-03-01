import Link from "next/link";
import { useSelector } from "../store";
import { Typography, Container, Box, Button } from "@material-ui/core";

const About = () => {
  const testId = useSelector((state) => state.test.id);
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button color="secondary" variant="contained">
          My App
        </Button>
      </Box>
    </Container>
  );
};
export default About;
