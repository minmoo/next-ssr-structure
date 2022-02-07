import axios from "@lib/api";
import { QueryClient, QueryFunctionContext, useQuery } from "react-query";

const KEY = "tool";

const keys = {
	all: [{ scope: KEY }] as const,
	lists: () => [{ ...keys.all[0], entity: "list" }] as const,
	list: (sorting: string) => [{ ...keys.lists()[0], sorting }] as const,
};

const fetch = async ({
	queryKey: [{ sorting }],
}: QueryFunctionContext<ReturnType<typeof keys["list"]>>) => {
	const response = await axios.get(`/api/portfolio/${KEY}?sorting=${sorting}`);
	return response.data.result;
};

export const useTools = (options: any) => {
	return useQuery(keys.list("desc"), fetch, options);
};

export const preTools = (client: QueryClient, options?: any) => {
	return client.prefetchQuery(keys.list("desc"), fetch, options);
};
