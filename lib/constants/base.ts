import portfolio from "@lib/data/portfolio";

const base: { [key: string]: any } = {
	MIN_PAPER_HEIGHT: "560px", //페이지 최소 크기 지원
	MIN_ONE_VH: 5.6,
	GAP: 100,
};

export const COMPONENT_HEIGHT = {
	//컴포넌트 고정 높이
	EXPERIENCE: 500,
};

export const PARALLAX: { [key: string]: [number, number] } = {
	LOCK_COMPONENT: [0, 100],
	LOCK_PAPER: [100, 300],
};

const projectStart =
	PARALLAX.LOCK_PAPER[1] +
	COMPONENT_HEIGHT.EXPERIENCE +
	base.GAP +
	base.GAP / 2;

PARALLAX.PROJECT_SLIDER = [
	projectStart,
	projectStart + (portfolio.projects.length - 1) * 100,
];

export const { MIN_PAPER_HEIGHT, MIN_ONE_VH, GAP } = base;

export const COLOR = {
	PINK: "#ff2d55",
	PURPLE: "#5856d6",
	ORANGE: "#ff9500",
	YELLOW: "#ffcc00",
	RED: "#ff3b30",
	TEALBLUE: "#5ac8fa",
	BLUE: "#007aff",
	GREEN: "#4cd964",
};
