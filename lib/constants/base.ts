import portfolio from "@lib/data/portfolio";

const base: { [key: string]: any } = {
	MIN_PAPER_HEIGHT: "560px", //페이지 최소 크기 지원
	MIN_ONE_VH: 5.6,
};

export const COMPONENT_HEIGHT = {
	//컴포넌트 고정 높이
	EXPERIENCE: 500,
};

export const PARALLAX: { [key: string]: [number, number] } = {
	LOCK_COMPONENT: [0, 100],
	LOCK_PAPER: [100, 300],
};

PARALLAX.PROJECT_SLIDER = [
	PARALLAX.LOCK_PAPER[1] + COMPONENT_HEIGHT.EXPERIENCE,
	PARALLAX.LOCK_PAPER[1] +
		COMPONENT_HEIGHT.EXPERIENCE +
		(portfolio.projects.length - 1) * 100,
];

export const { MIN_PAPER_HEIGHT, MIN_ONE_VH } = base;
