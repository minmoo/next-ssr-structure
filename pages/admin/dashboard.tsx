import { Container, Button } from "@mui/material";
import Head from "next/head";
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import axios from "lib/api";

const dashboard = () => {
	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Container maxWidth={false}>
				<GridContainer spacing={3}>
					<GridItem xs={12} xl={3} sm={6} lg={3}>
						<MiniCard />
					</GridItem>
					<GridItem xs={12} xl={3} sm={6} lg={3}>
						<MiniCard />
					</GridItem>
					<GridItem xs={12} xl={3} sm={6} lg={3}>
						<MiniCard />
					</GridItem>
					<GridItem xs={12} xl={3} sm={6} lg={3}>
						<MiniCard />
					</GridItem>

					<GridItem xs={12} xl={9} md={12} lg={8}>
						<ChartCard />
					</GridItem>

					<GridItem xs={12} xl={3} md={6} lg={4}>
						<TableCard />
					</GridItem>

					<Button
						onClick={() => {
							throw new Error("Frontend Error sentry");
						}}
					>
						Sentry FrontEnd Error
					</Button>

					<Button
						onClick={() => {
							axios.get("/api/sentryCheck");
						}}
					>
						Sentry Server Error
					</Button>
				</GridContainer>
			</Container>
		</>
	);
};

export default dashboard;
