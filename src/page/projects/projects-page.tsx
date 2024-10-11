import { Element } from 'react-scroll';

import styles from './projects-page.module.css';
import transitionStyles from '../transitions.module.css';

import Project from './components/project';
import ImageScroller from './components/image-scroller';

function ProjectsPage() {
	return (
		<Element id={styles["projects-page"]} name="projects">
			<div id={styles["projects-page-child"]} className={transitionStyles["interactive"]}>
				<h1 id={styles["projects-label"]} className={transitionStyles["interactive"]}>Projects</h1>
				<p id={styles["projects-description"]} className={transitionStyles["interactive"]}>Some projects and other things that I think are pretty cool</p>

				<div className={[styles["project-type-div"], transitionStyles["interactive"]].join(' ')}>
					<h2 className={[styles["project-type-label"], transitionStyles["interactive"]].join(' ')}>Coding</h2>
					<div className={styles["projects-div"]}>
						<Project name="Schmek" description="A twist on the classic snake game, where players can upgrade abilities and create simple combos" 
							demoLink="https://schmek.dkg.zone" codeLink="https://github.com/EricL521/Schmek"/>
						<Project name="RingVC" description="A discord bot that allows you to easily ping people to join you in a Discord server voice chat" 
							codeLink="https://github.com/EricL521/RingVC"/>
						<Project name="Rotating Arrow Game" description="An online implementation of a really cool puzzle game I found in a mobile app" 
							demoLink="https://ericl521.github.io/Rotating-Arrow-Game/" codeLink="https://github.com/EricL521/Rotating-Arrow-Game"/>
						<Project name="ParticleJS" description="In my opinion, satisfying, but very ineffecient particle simulation. Warning: flash bang for dark mode users" 
							demoLink="https://ericl521.github.io/particlejs/test/test.html" codeLink="https://github.com/EricL521/particlejs"/>
						<Project name="Soldier Tycoon" description="One of my first games! A one file monstrocity where you defend a castle from raiders" 
							demoLink="https://ericl521.github.io/Soldier-Tycoon/" codeLink="https://github.com/EricL521/Soldier-Tycoon"/>
					</div>
				</div>

				<div className={[styles["project-type-div"], transitionStyles["interactive"]].join(' ')}>
					<h2 className={[styles["project-type-label"], transitionStyles["interactive"]].join(' ')}>CNC</h2>
					<p className={[styles["project-type-description"], transitionStyles["interactive"]].join(' ')}>At least what I have photos of</p>
					<div className={styles["projects-div"]}>
						<Project name="Svejk Dice" description="Custom wood dice made with a CNC and a custom jig. Designed using Inkscape because I like open source stuff" 
							image={{src: "/images/projects/svejk-dice.jpg", alt: "A die with Svejk on one face", height: 200}}/>
					</div>
				</div>

				<div className={[styles["project-type-div"], transitionStyles["interactive"]].join(' ')}>
					<h2 className={[styles["project-type-label"], transitionStyles["interactive"]].join(' ')}>Crossview Images</h2>
					<p className={[styles["project-type-description"], transitionStyles["interactive"]].join(' ')}>
						For more info about crossview, and a tutorial, check out <a href="https://www.reddit.com/r/CrossView/wiki/index/" target="_blank" 
							className={[transitionStyles["interactive"], transitionStyles["clickable"]].join(' ')}>this</a> reddit post </p>
					<ImageScroller height={200} images={[
						{src: "/images/crossview/nighttime-street.jpg", alt: "Crossview image of a street at night"},
						{src: "/images/crossview/water-reflection.jpg", alt: "Crossview image of some lights reflecting in water"},
						{src: "/images/crossview/fish-pond.jpg", alt: "Crossview image of some fish in a pond"},
						{src: "/images/crossview/bag-milk.jpg", alt: "Crossview image of a bag of milk"},
						{src: "/images/crossview/burger.jpg", alt: "Crossview image of a burger I got at a restaurant"},
					]}/>
				</div>
			</div>
		</Element>
	);
}

export default ProjectsPage;