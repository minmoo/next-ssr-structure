import { Container } from "@mui/material";
import Head from "next/head";
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import GridContainer from "../../components/common/grid/GridContainer";
import GridItem from "../../components/common/grid/GridItem";
import ChartCard from "../../components/common/card/ChartCard";
import MiniCard from "../../components/common/card/MiniCard";
import TableCard from "../../components/common/card/TableCard";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import MapCard from "../../components/common/card/MapCard";

// 서버사이드 렌더링 사용 X -> window와 document 사용을 위해
// const MapCard = dynamic(import("../../components/common/card/MapCard"), {
//   ssr: false,
// });

const map: NextPage = () => {
	return (
		<>
			<Head>
				<title>Map</title>
			</Head>
			<Container maxWidth={false}>
				<GridContainer spacing={3}>
					<GridItem xs={12} xl={12} sm={12} lg={12}>
						{/* <MapCard /> */}
						MAP
					</GridItem>
				</GridContainer>
			</Container>
		</>
	);
};

export default map;
