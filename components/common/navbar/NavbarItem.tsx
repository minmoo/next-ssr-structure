import {
	Collapse,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createElement, ReactElement, useState } from "react";
import { TnavItem } from "../../../store/admin";
import Link from "next/link";
import Icon from "@mui/material/Icon";

const useStyles = makeStyles<Theme>((theme) =>
	createStyles({
		items: {
			"&.active": {
				"background": "rgba(0,0,0,0.08)",
				"& .MuiListItemIcon-root": {
					color: "#fff",
				},
			},
		},
		itemIcon: {
			minWidth: 50,
			color: theme.palette.primary.main,
		},
	}),
);

export default function NavbarItem(props: TnavItem): ReactElement | null {
	const { title, url, icon, subItems } = props;
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const isExpandable = subItems && subItems.length > 0;

	const ListChildren = (
		<>
			{!!icon && (
				<ListItemIcon className={classes.itemIcon}>
					<Icon>{icon}</Icon>
				</ListItemIcon>
			)}
			<ListItemText primary={title} inset={!icon} />
			{isExpandable && !open && <ExpandMoreIcon />}
			{isExpandable && open && <ExpandLessIcon />}
		</>
	);

	const RootItem =
		!url || typeof url !== "string" ? (
			<ListItem
				button
				className={classes.items}
				onClick={() => {
					setOpen(!open);
				}}
			>
				{ListChildren}
			</ListItem>
		) : (
			<Link href={url} passHref>
				<ListItem button className={classes.items} component="a">
					{ListChildren}
				</ListItem>
			</Link>
		);

	const SubItem = isExpandable ? (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Divider />
			<List component="div" disablePadding>
				{subItems?.map((item) => (
					<NavbarItem {...item} key={item.id} />
				))}
			</List>
		</Collapse>
	) : null;

	return (
		<>
			{RootItem}
			{SubItem}
		</>
	);
}
