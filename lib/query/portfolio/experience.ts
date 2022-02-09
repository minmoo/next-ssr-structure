import axios from "@/lib/api";
import { ModelExperience } from "@/models/experience";
import {
	QueryFunctionContext,
	useQuery,
	QueryClient,
	FetchQueryOptions,
} from "react-query";

const KEY = "experience";

const keys = {
	// * 모든 키들은 object array로 되어있다.
	// 그냥 array로 쓸 경우 비구조화시 순서를 생각해야 하지만 object는 비구조화할때 명확하다
	all: [{ scope: KEY }] as const,
	lists: () => [{ ...keys.all[0], entity: "list" }] as const,
	list: (sorting: string) => [{ ...keys.lists()[0], sorting }] as const,
};

// QueryFunctionContext 사용한다.
// QueryFunctionContext을 사용하지 않고 useQuery(key, fetch(param)) 이런식으로 사용하면
// param이 key에 포함되지 않는경우가 생겨서 제대로 caching되지 않는다
const fetch = async ({
	queryKey: [{ sorting }],
}: QueryFunctionContext<ReturnType<typeof keys["list"]>>) => {
	const response = await axios.get<ModelExperience[]>(
		`/api/portfolio/${KEY}?sorting=${sorting}`,
	);
	return response.data;
};

export const useExperiences = (options: any) => {
	return useQuery(keys.list("desc"), fetch, options);
};

export const preExperiecnes = (client: QueryClient, options?: any) => {
	return client.prefetchQuery(keys.list("desc"), fetch, options);
};

// 🕺 remove everything related to the experiences feature
// queryClient.removeQueries([{ scope: 'experience' }])
// queryClient.removeQueries(keys.all)

// 🚀 reset all experience lists
// queryClient.resetQueries([{ scope: 'experience', entity: 'list' }])
// queryClient.invalidateQueries(keys.lists())

// 🙌 invalidate all lists across all scopes
// queryClient.invalidateQueries([{ entity: 'list' }])

// 🙌 prefetch a single todo
// queryClient.prefetchQueries(keys.list('desc'), () => fetch('desc'))
