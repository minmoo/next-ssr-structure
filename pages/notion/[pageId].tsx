import React from "react";
import Head from "next/head";
import * as NotionTypes from "notion-types";
import { getPageTitle, getAllPagesInSpace } from "notion-utils";
import { NotionAPI } from "notion-client";
import { Collection, CollectionRow, NotionRenderer } from "react-notion-x";
import { GetStaticProps } from "next";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

const notion = new NotionAPI();

export const getStaticProps: GetStaticProps = async (context) => {
	const pageId = context.params?.pageId as string;
	const recordMap = await notion.getPage(pageId);

	return {
		props: {
			recordMap,
		},
		revalidate: 10, //10초 후 페이지 re-render발생가능
	};
};

export async function getStaticPaths() {
	if (isDev) {
		return {
			paths: [],
			fallback: true, //미리 정의하지 않은 경로들을 실시간으로 rendering한다.
		};
	}

	const rootNotionPageId = "Portfolio-b22e6a3ff284483e8f53117c8a61e555";

	// This crawls all public pages starting from the given root page in order
	// for next.js to pre-generate all pages via static site generation (SSG).
	// This is a useful optimization but not necessary; you could just as easily
	// set paths to an empty array to not pre-generate any pages at build time.
	const pages = await getAllPagesInSpace(
		rootNotionPageId,
		undefined, // rootNotionSpaceId
		notion.getPage.bind(notion),
		{
			traverseCollections: false,
		},
	);

	const paths = Object.keys(pages).map((pageId) => `/notion/${pageId}`);

	return {
		paths,
		fallback: true,
	};
}

export default function NotionPage({
	recordMap,
}: {
	recordMap: NotionTypes.ExtendedRecordMap;
}) {
	if (!recordMap) {
		return null;
	}

	const title = getPageTitle(recordMap);
	console.log(title, recordMap);

	return (
		<>
			<Head>
				<meta name="description" content="React Notion X demo renderer." />
				<title>{title}</title>
			</Head>
			<NotionRenderer
				recordMap={recordMap}
				fullPage={false}
				darkMode={false}
				customImages={true}
				rootDomain="localhost:7008" // used to detect root domain links and open this in the same tab
				components={{
					image: ({
						src,
						alt,
						height,
						width,
						className,
						style,
						loading,
						decoding,
						ref,
						onLoad,
					}: any) => (
						<img
							className={className}
							style={style}
							src={src}
							ref={ref}
							width={width}
							height={height}
							loading="lazy"
							alt={alt}
							decoding="async"
						/>
					),
					collection: Collection,
					collectionRow: CollectionRow,
				}}
			/>
		</>
	);
}
