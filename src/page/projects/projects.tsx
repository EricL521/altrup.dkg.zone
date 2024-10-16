import transitionStyles from '../transitions.module.css';

const codingSection = {
	title: "Coding",
	projects: [
		{ 
			name: "Schmek", description: "A twist on the classic snake game, where players can upgrade abilities and create simple combos", 
			demoLink: "https://schmek.dkg.zone", codeLink: "https://github.com/EricL521/Schmek"
		},
		{
			name: "RingVC", description: "A discord bot that allows you to easily ping people to join you in a Discord server voice chat", 
			codeLink: "https://github.com/EricL521/RingVC"
		},
		{
			name: "Rotating Arrow Game", description: "An online implementation of a really cool puzzle game I found in a mobile app", 
			demoLink: "https://ericl521.github.io/Rotating-Arrow-Game/", codeLink: "https://github.com/EricL521/Rotating-Arrow-Game"
		},
		{
			name: "ParticleJS", description: "In my opinion, satisfying, but very ineffecient particle simulation. Warning: flash bang for dark mode users", 
			demoLink: "https://ericl521.github.io/particlejs/test/test.html", codeLink: "https://github.com/EricL521/particlejs"
		},
		{
			name: "Soldier Tycoon", description: "One of my first games! A one file monstrocity where you defend a castle from raiders", 
			demoLink: "https://ericl521.github.io/Soldier-Tycoon/", codeLink: "https://github.com/EricL521/Soldier-Tycoon"
		}
	]
};

const cncSection = {
	title: "CNC",
	description: "At least what I have photos of",
	projects: [
		{
			name: "Svejk Dice", description: "Custom wood dice made with a CNC machine and a custom jig. Designed using Inkscape because I like open source stuff", 
			image: {preview: "/images/preview/projects/svejk-dice.jpg", full: "/images/full/projects/svejk-dice.jpg", alt: "A die with Svejk on one face", height: 200}
		}
	]
};

const crossViewSection = {
	title: "Cross View Images",
	description: <>
		{"Cross your eyes and try to make the images overlap! For more info about cross view and a tutorial, check out "}
		<a href="https://www.reddit.com/r/CrossView/wiki/index/" target="_blank" 
		className={[transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"]].join(' ')}>this</a>{" Reddit post."}
	</>,
	imageScroller: {
		height: 200,
		images: [
			{preview: "/images/preview/crossview/nighttime-street.jpg", full: "/images/full/crossview/nighttime-street.jpg", alt: "Cross view image of a street at night"},
			{preview: "/images/preview/crossview/water-reflection.jpg", full: "/images/full/crossview/water-reflection.jpg", alt: "Cross view image of some lights reflecting in water"},
			{preview: "/images/preview/crossview/fish-pond.jpg", full: "/images/full/crossview/fish-pond.jpg", alt: "Cross view image of some fish in a pond"},
			{preview: "/images/preview/crossview/bag-milk.jpg", full: "/images/full/crossview/bag-milk.jpg", alt: "Cross view image of a bag of milk"},
			{preview: "/images/preview/crossview/burger.jpg", full: "/images/full/crossview/burger.jpg", alt: "Cross view image of a burger I got at a restaurant"},
			{preview: "/images/preview/crossview/svejk-dice.jpg", full: "/images/full/crossview/svejk-dice.jpg", alt: "Cross view image of a die with Svejk on one face"}
		]
	}
}

export default [codingSection, cncSection, crossViewSection];