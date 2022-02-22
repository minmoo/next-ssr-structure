import axios from "@/lib/api";
import { ModelTool } from "@/models/tool";
import { QueryClient, QueryFunctionContext, useQuery } from "react-query";

const KEY = "tool";

const keys = {
	all: [{ scope: KEY }] as const,
	lists: () => [{ ...keys.all[0], entity: "list" }] as const,
	list: (sorting: string) => [{ ...keys.lists()[0], sorting }] as const,
};

const fetch = async ({
	queryKey,
}: QueryFunctionContext<ReturnType<typeof keys["lists"]>>) => {
	const response = await axios.get<ModelTool[]>(`/api/portfolio/${KEY}`);
	return response.data;
};

export const useTools = (options: any) => {
	return { ...useQuery(keys.lists(), fetch, options), queryKey: keys.lists() };
};

export const preTools = (client: QueryClient, options?: any) => {
	return client.prefetchQuery(keys.lists(), fetch, options);
};
