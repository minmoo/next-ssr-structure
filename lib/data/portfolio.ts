export interface TSkill {
	category: string;
	title: string;
	icon: string;
	proficient: number;
}

export interface TProject {
	title: string;
	desc: string;
	image: string;
	skills: string[];
}

export default {
	projects: [
		{
			title: "Project1",
			desc: "desc",
			image: "/bg.jpg",
			skills: ["react", "nextjs"],
		},
		{
			title: "Project2",
			desc: "desc",
			image: "/bg.jpg",
			skills: ["react", "nextjs"],
		},
		{
			title: "Project3",
			desc: "desc",
			image: "/bg.jpg",
			skills: ["react", "nextjs"],
		},
		{
			title: "Project4",
			desc: "desc",
			image: "/bg.jpg",
			skills: ["react", "nextjs"],
		},
		{
			title: "Project5",
			desc: "desc",
			image: "/bg.jpg",
			skills: ["react", "nextjs"],
		},
	],
	skills: [
		{
			category: "Frontend",
			title: "React",
			icon: "/icon/react.png",
			proficient: 50, //0~100
		},
		{
			category: "Frontend",
			title: "Nextjs",
			icon: "/icon/nextjs.png",
			proficient: 70, //0~100
		},
		{
			category: "Frontend",
			title: "Redux",
			icon: "/icon/redux.png",
			proficient: 70, //0~100
		},
		{
			category: "Frontend",
			title: "Emotion",
			icon: "/icon/emotion.png",
			proficient: 70, //0~100
		},
		{
			category: "Backend",
			title: "Spring(JAVA)",
			icon: "/icon/spring.png",
			proficient: 70, //0~100
		},
		{
			category: "Backend",
			title: "Django(Python)",
			icon: "/icon/django.png",
			proficient: 70, //0~100
		},
		{
			category: "Backend",
			title: "Express(Node)",
			icon: "/icon/express.png",
			proficient: 70, //0~100
		},
		{
			category: "Database",
			title: "RDB(Oracle, postgreSQL, Mysql)",
			icon: "/icon/postgresql.png",
			proficient: 70, //0~100
		},
		{
			category: "Database",
			title: "NoSQL(mongo, redis)",
			icon: "/icon/mongo.png",
			proficient: 70, //0~100
		},
		{
			category: "Deep learning",
			title: "PyTorch",
			icon: "/icon/pytorch.png",
			proficient: 70, //0~100
		},
		{
			category: "Deep learning",
			title: "TensorFlow",
			icon: "/icon/tensorflow.png",
			proficient: 70, //0~100
		},
	],
};
