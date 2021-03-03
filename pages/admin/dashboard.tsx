import Link from "next/link";
import Admin from "../../layout/Admin";

const dashboard = () => {
  return (
    <div>
      <div>
        <img src="/cheese.jpg" />
      </div>
      <h2>Hello</h2>
      <Link href="/">Move to '/'</Link>
    </div>
  );
};

dashboard.layout = Admin;

export default dashboard;
