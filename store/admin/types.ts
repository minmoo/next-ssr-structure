export type TnavItem = {
	id: string;
	title: string;
	url?: string;
	type?: string;
	icon?: string;
	subItems?: TnavItem[];
};

export type Tnavbar = {
	isFix: boolean;
	isOpen: boolean;
	items: TnavItem[];
};

export type Ttoolbar = {
	title: string;
	time: string;
};

export type Tadmin = {
	navbar: Tnavbar;
	toolbar: Ttoolbar;
};
