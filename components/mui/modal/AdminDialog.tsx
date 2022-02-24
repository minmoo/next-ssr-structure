import { useSelector } from "@/store";
import { actions } from "@/store/iphone";
import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
	DataGrid,
	GridActionsCellItem,
	GridColumns,
	GridEditRowsModel,
	GridRowId,
	GridRowsProp,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "@/lib/api";
import _ from "lodash";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import useConfirm from "@/lib/hooks/useConfirm";
import useSnackbar from "@/lib/hooks/useSnackbar";

const getCustomToolbar = (handleAddClick: () => void) => {
	const CustomToolbar = () => {
		return (
			<GridToolbarContainer>
				<Button startIcon={<AddIcon />} onClick={handleAddClick}>
					Add
				</Button>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
			</GridToolbarContainer>
		);
	};
	return CustomToolbar;
};

const AdminDialog = () => {
	const {
		fullScreen,
		open,
		handleClose,
		title,
		editRowsModel,
		isLoading,
		rows,
		columns,
		handleEditRowsModelChange,
		handleAddClick,
		handleRowEditCommit,
	} = useAdminDialog();

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={handleClose}
			maxWidth="lg"
		>
			<DialogTitle>{title}</DialogTitle>
			<Alert severity="info" style={{ marginBottom: 8 }}>
				<code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
			</Alert>
			<DialogContent>
				{isLoading ? (
					<CircularProgress />
				) : (
					<div style={{ height: "60vh", width: "70vw", minHeight: "400px" }}>
						<DataGrid
							editMode="row"
							rows={rows}
							columns={columns}
							editRowsModel={editRowsModel}
							onEditRowsModelChange={handleEditRowsModelChange}
							onRowEditCommit={handleRowEditCommit}
							components={{
								Toolbar: getCustomToolbar(handleAddClick),
							}}
						/>
					</div>
				)}
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const useAdminDialog = () => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const dispatch = useDispatch();
	const [editRowsModel, setEditRowsModel] = useState<GridEditRowsModel>({});
	const confirm = useConfirm();
	const snackbar = useSnackbar();
	const { open, title, queryKey } = useSelector((state) => state.iphone.modal);
	const cache = useQueryClient();
	const { data, isLoading } = useQuery<any, unknown, { _id?: string }[]>(
		queryKey,
		{ enabled: !!queryKey },
	); //Default Query

	const updateMutation = useMutation<any, unknown, any>(
		(updateData) => {
			return axios.put(`/api/portfolio/${queryKey[0].scope}`, updateData);
		},
		{
			onSuccess: () => {
				cache.invalidateQueries(queryKey);
				snackbar({
					message: "Update success!",
				});
			},
		},
	);

	const deleteMutation = useMutation<any, unknown, any>(
		(id) => {
			return axios.delete(`/api/portfolio/${queryKey[0].scope}?id=${id}`);
		},
		{
			onSuccess: () => {
				cache.invalidateQueries(queryKey);
				snackbar({
					message: "Delete success!",
				});
			},
		},
	);

	const insertMutation = useMutation<any, unknown, any>(
		(row) => {
			return axios.post(`/api/portfolio/${queryKey[0].scope}`, row);
		},
		{
			onSuccess: () => {
				cache.invalidateQueries(queryKey);
				snackbar({
					message: "Insert success!",
				});
			},
		},
	);

	const handleAddClick = () => {
		const copyLastData = _.last(data);

		if (copyLastData) {
			delete copyLastData._id;
			insertMutation.mutate(copyLastData);
		}
	};

	const handleDeleteClick = useCallback(
		(id: string) => (event: any) => {
			event.stopPropagation();
			confirm()
				.then(() => deleteMutation.mutate(id))
				.catch(() => console.log("취소"));
		},
		[deleteMutation, confirm],
	);

	const columns: GridColumns = useMemo(() => {
		if (data) {
			return Object.keys(data[0])
				.map((key) => ({
					field: key,
					headerName: key,
					width: 180,
					editable: true,
				}))
				.concat({
					field: "actions",
					type: "actions",
					headerName: "Action",
					width: 100,
					// renderCell: (params) => {
					// 	const onClick = (e) => {
					// 		e.stopPropagation();

					// 		const api = params.api;
					// 		const thisRow: Record<string, GridCellValue> = {};
					// 		api
					// 			.getAllColumns()
					// 			.filter((c) => c.field !== "__check__" && !!c)
					// 			.forEach(
					// 				(c) =>
					// 					(thisRow[c.field] = params.getValue(params.id, c.field)),
					// 			);

					// 		return alert(JSON.stringify(thisRow, null, 4));
					// 	};
					// 	return (
					// 		<IconButton onClick={onClick} aria-label="delete" color="primary">
					// 			<DeleteIcon />
					// 		</IconButton>
					// 	);
					// },
					getActions: ({ id }: { id: string }) => {
						return [
							<GridActionsCellItem
								key={id}
								icon={<DeleteIcon />}
								label="Delete"
								onClick={handleDeleteClick(id)}
								color="inherit"
							/>,
						];
					},
				} as any);
		}
		return [];
	}, [data, handleDeleteClick]);

	const rows: GridRowsProp = useMemo(() => {
		if (data) {
			return data.map((row: any) => ({
				...row,
				id: row["_id"],
			}));
		}
		return [];
	}, [data]);

	const handleEditRowsModelChange = useCallback((model: GridEditRowsModel) => {
		setEditRowsModel(model);
	}, []);

	const handleRowEditCommit = (id: GridRowId) => {
		if (_.isEmpty(editRowsModel)) {
			return;
		}
		const editRowData = editRowsModel[id];

		const data = Object.keys(editRowData).reduce(
			(next, key) => ({ ...next, [key]: editRowData[key].value }),
			{},
		);

		updateMutation.mutate(data);
	};

	const handleClose = () => {
		dispatch(actions.closeDialog());
	};

	return {
		fullScreen,
		open,
		title,
		editRowsModel,
		isLoading,
		rows,
		columns,
		handleClose,
		handleEditRowsModelChange,
		handleAddClick,
		handleRowEditCommit,
	};
};

export default AdminDialog;