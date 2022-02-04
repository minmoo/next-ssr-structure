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
	experience: [
		{
			company: "SSG.com",
			period: ["2016.07", "2019.04"],
			role: "배송(TMS) 및 관제 개발 및 운영",
			image: "/icon/ssg.png",
		},
		{
			company: "SSG.com",
			period: ["2019.04", "2021.07"],
			role: "AI 서비스 개발 및 운영",
			image: "/icon/ssg.png",
		},
		{
			company: "ZIGBANG",
			period: ["2021.07", "ing"],
			role: "호갱노노 서비스 Frontend 개발 및 운영",
			image: "/icon/zigbang.png",
		},
	],
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
	tools: [
		{
			title: "Git",
			icon: "/icon/git.png",
		},
		{
			title: "Gitlab",
			icon: "/icon/gitlab.png",
		},
		{
			title: "Docker",
			icon: "/icon/docker.png",
		},
		{
			title: "Jenkins",
			icon: "/icon/jenkins.png",
		},
		{
			title: "Airflow",
			icon: "/icon/airflow.png",
		},
		{
			title: "AWS",
			icon: "/icon/aws.png",
		},
		{
			title: "Azure",
			icon: "/icon/azure.png",
		},
		{
			title: "Cordova",
			icon: "/icon/cordova.png",
		},
	],
};
