import { getTodosAPI } from "../lib/api/todos";
import { GetServerSideProps, NextPage } from "next";
import { wrapper } from "../store";
import { actions } from "../store/test";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const index: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL, "클라이언트");
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
        <h1>Styled-components</h1>
        <h1>Styled-components</h1>
      </Container>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL, "서버");

      const res = await getTodosAPI();
      store.dispatch(actions.testReducer("redux store"));
      console.log(res.data);
      return { props: {} };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  }
);

export default index;
