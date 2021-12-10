import {
	ApolloClient,
	ApolloConsumer,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import { isEqualType } from "graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { useMemo } from "react";
import isEqual from "lodash/isEqual";

type TgraphQlContext = {
	req: NextApiRequest;
	res: NextApiResponse;
	//option
};

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

function createIsomorphicLink(context: TgraphQlContext | undefined) {
	/*
		SSG and SSR
	*/
	if (typeof window === "undefined") {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { SchemaLink } = require("@apollo/client/link/schema");

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const graphQlSchema = require("./gql/schema").default;
		return new SchemaLink({ schema: graphQlSchema, context });
	}

	/*
		Client-side
	*/
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { HttpLink } = require("@apollo/client");
	return new HttpLink({
		uri: "http://localhost:7008/api/graphql", //서버 URL (상대주소가 아닌 절대 주소)
		credentials: "same-origin", // credentials 나 headers 같은 추가적 fetch() 옵션
	});
}

function createApolloClient(context?: TgraphQlContext): ApolloClient<any> {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: createIsomorphicLink(context),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	initialState: any = null,
	// getStaticProps에서 custom context를 보낼 수 있다.
	// SchemaLink에서 사용하여 server에서 page render
	context?: TgraphQlContext,
): ApolloClient<any> {
	const _apolloClient = apolloClient ?? createApolloClient(context);

	// Next.js에서 Apollo Client를 이용해 데이터를 가져오는 함수가 있다면, 초기 상태값이 여기에서 합쳐진다.
	if (initialState) {
		// 클라이언트에서의 받은 데이터인 현재 캐시 데이터를 가져온다.
		const existingCache = _apolloClient.extract();

		// 현재 캐시와 SSR 메소드인 getStaticProps/getServerSideProps로 부터 받은 데이터를 합친다.
		/*
			TODO existingCache, initial State 순서 생각
			1. existingCache에 initialState를 merge -> server data cache에 덮어쓰기
			2. initialState에 existingCache를 merge -> server data 한번만 반영 -> 계속 같은데이터
		*/
		const data = merge(existingCache, initialState, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter((d) =>
					sourceArray.every((s) => !isEqual(d, s)),
				),
			],
		});

		// 합쳐진 데이터를 저장한다.
		_apolloClient.cache.restore(data);
	}

	// SSG(Server Side Generation)와 SSR(Server Side Rendering)은 항상 새로운 Apollo Client를 생성한다.
	if (typeof window === "undefined") return _apolloClient;

	// 클라이언트의 Apollo Client는 한 번만 생성한다.(sigleton)
	if (!apolloClient) apolloClient = _apolloClient;

	return apolloClient;
}

export function addApolloState(
	client: ApolloClient<NormalizedCacheObject>,
	pageProps: any,
): any {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps;
}

export const getApolloClient = initializeApollo;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(pageProps: any) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo(state), [state]);

	return store;
}
