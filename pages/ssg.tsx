import { GetServerSideProps, NextPage } from "next";
import { wrapper } from "../store";
import Link from "next/link";
import styled from "styled-components";
import React, { useContext } from "react";
import { actions } from "../store/admin";
import { useSelector } from "../store";

const Container = styled.div`
	padding: 20px;
`;

const ssg: NextPage = ({ time }: any) => {
	// const time = useSelector((state) => state.admin.toolbar.time);

	return (
		<div>
			{/* <h2>Link to 'tomato' page</h2>
      <Link href="/tomato">
        <a>Move to '/tomato'</a>
      </Link> */}
			<div>
				<Link href="/vegetable/potato">
					<a>Move to '/vegetable/potato'</a>
				</Link>
				<Link href="/tomato">
					<a>Move to '/tomato'</a>
				</Link>
			</div>
			<Container>
				<h1>{time}</h1>
			</Container>
		</div>
	);
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
	try {
		// store.dispatch(actions.setTime(new Date().toTimeString()));

		return { props: { time: new Date().toTimeString() }, revalidate: 3 };
	} catch (e) {
		console.log(e);
		return { props: {} };
	}
});

export default ssg;
