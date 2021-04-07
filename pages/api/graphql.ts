import { ApolloServer, gql, ResolveType } from "apollo-server-micro";
import schema from "../../lib/gql/schema";

// context에서 return 한 값은 모든 resolver의 메소드 context인자로 들어가기 때문에
// DB는 context에 연결해두고 사용한다.
const apolloServer = new ApolloServer({ schema });

export const config = {
	api: {
		bodyParser: false,
	},
};

export default apolloServer.createHandler({ path: "/api/graphql" });
