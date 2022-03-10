import { orange } from "@mui/material/colors";
import WidgetMulti from "@/components/mui/widget/WidgetMulti";
import { useTools } from "@/lib/query/portfolio/tool";
import { useShowDialog } from "@/store/iphone/hooks";
import ItemTool from "./ItemTool";

const Tool = () => {
	const onShowDialog = useShowDialog();
	const {
		isLoading,
		error,
		data: tools,
		queryKey,
	} = useTools({
		staleTime: 1000 * 60,
	});

	if (isLoading) {
		return <></>;
	}

	return (
		<WidgetMulti
			title="Tools I Use"
			columnCount={4}
			primaryColor={orange[700]}
			secondaryColor={orange[400]}
			onAdminEdit={() => {
				onShowDialog({
					type: "admin",
					open: true,
					title: "Tool",
					options: { queryKey },
				});
			}}
			items={
				tools?.map((tool, idx) => <ItemTool tool={tool} key={idx} />) ?? []
			}
		></WidgetMulti>
	);
};

export default Tool;
