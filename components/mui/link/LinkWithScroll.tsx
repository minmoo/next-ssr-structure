import { forwardRef, Ref } from "react";
import Link, { LinkRef, NextLinkProps } from "./Link";

interface LinkWithScrollProps extends Omit<NextLinkProps, "href"> {
	path: string | number;
}

const LinkWithScroll = (
	{ path, ...rest }: LinkWithScrollProps,
	ref: Ref<LinkRef>,
) => {
	if (typeof path === "string") {
		return <Link href={path as string} {...rest} ref={ref} />;
	}

	//number
	return (
		<Link
			href="#"
			ref={ref}
			onClick={() => {
				if (path < 0) {
					path = document.body.scrollHeight;
				}
				window.scrollTo({ top: path as number, behavior: "smooth" });
			}}
			{...rest}
		/>
	);
};

export default forwardRef<LinkRef, LinkWithScrollProps>(LinkWithScroll);
