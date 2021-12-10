import Link from "next/link";
import { useRouter } from "next/router";

const Name = () => {
	const router = useRouter();
	console.log(router);

	return (
		<div>
			<div>
				<img src="/cheese.jpg" />
			</div>
			<h2>Hello</h2>
			<Link href="/">Move to '/'</Link>
			<Link href="/ssg">Move to '/ssg'</Link>
		</div>
	);
};

export default Name;
