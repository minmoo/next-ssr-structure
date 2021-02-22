import Link from "next/link";
import { useSelector } from "../store";

const Tomato = () => {
  const testId = useSelector((state) => state.test.id);
  return (
    <div>
      <h2> Link to Main Page</h2>
      <h3> Test ID: {testId} </h3>
      <Link href="/">
        <a> move to '/'</a>
      </Link>
    </div>
  );
};
export default Tomato;
