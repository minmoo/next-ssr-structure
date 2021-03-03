import { getTodosAPI } from "../lib/api/todos";
import { GetServerSideProps, NextPage } from "next";
import { wrapper } from "../store";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actions } from "../store/auth";
import * as Icons from "@material-ui/icons/";
import React from "react";

const Container = styled.div`
  padding: 20px;
`;

const index: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL, "클라이언트");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.asyncLogout());
  };

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
        {React.createElement(Icons["Dashboard"])}
      </div>
      <Container>
        <h1>Styled-components</h1>
        <Button onClick={handleClick}>saga test</Button>
      </Container>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL, "서버");
      return { props: {} };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  }
);

export default index;
