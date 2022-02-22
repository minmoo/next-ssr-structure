import axios from "@/lib/api";
import { ModelProject } from "@/models/project";
import { QueryClient, QueryFunctionContext, useQuery } from "react-query";

const KEY = "project";

const keys = {
	all: [{ scope: KEY }] as const,
	lists: () => [{ ...keys.all[0], entity: "list" }] as const,
	list: (sorting: string) => [{ ...keys.lists()[0], sorting }] as const,
};

const fetch = async ({
	queryKey,
}: QueryFunctionContext<ReturnType<typeof keys["lists"]>>) => {
	const response = await axios.get<ModelProject[]>(`/api/portfolio/${KEY}`);
	return response.data;
};

export const useProjects = (options: any) => {
	return {
		...useQuery(keys.lists(), fetch, options),
		queryKey: keys.lists(),
	};
};

export const preProjects = (client: QueryClient, options?: any) => {
	return client.prefetchQuery(keys.lists(), fetch, options);
};
