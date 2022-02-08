import axios from "@lib/api";
import { ModelTool } from "@models/tool";
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
	const response = await axios.get<ModelTool[]>(
		`/api/portfolio/${KEY}?sorting=${sorting}`,
	);
	return response.data;
};

export const useTools = (options: any) => {
	return useQuery(keys.list("desc"), fetch, options);
};

export const preTools = (client: QueryClient, options?: any) => {
	return client.prefetchQuery(keys.list("desc"), fetch, options);
};
