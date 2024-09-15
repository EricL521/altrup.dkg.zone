import { useCallback, useContext, useEffect, useReducer, useState } from 'react';

import { unFocus } from '../../unFocus';

import { ThemeContext } from '../root';

import darkModeIcon from '../../icons/dark-mode.svg';
import lightModeIcon from '../../icons/light-mode.svg';
import systemModeIcon from '../../icons/system-mode.svg';

import styles from './theme-changer.module.css';

// Make typescript happy
declare const themeManager: EventTarget & {updateTheme: (theme: string) => void, themeSetting: string, theme: string};

// NOTE: the logic for this component runs Client side only
function ThemeChanger() {
	const [isClient, _] = useState(typeof window !== 'undefined');

	// import context
	const {theme, themeSetting} = useContext(ThemeContext);

	const [hidden, setHidden] = useState(true);
	// after theme and settings update, make component visible
	useEffect(() => setHidden(false));

	// store order of buttons, too, to swap order when setting theme (feels more natural)
	const [order, dispatchOrder] = useReducer((state: string[], theme: string) => {
		return [theme].concat(state.filter(val => val !== theme));
	}, ['light', 'dark', 'system']);
	// cssOrder is one frame behind order, to make animations work properly
	const [cssOrder, setCssOrder] = useState(['light', 'dark', 'system']);
	useEffect(() => { requestAnimationFrame(() => setCssOrder(order)); }, [order])
	// initialize order
	useEffect(() => dispatchOrder(themeManager.themeSetting), []);

	const getButtonIcon = useCallback((buttonTheme: string) => {
		if (buttonTheme === 'light') return lightModeIcon;
		if (buttonTheme === 'dark') return darkModeIcon;
		if (buttonTheme === 'system') return systemModeIcon;
	}, []);

	const updateTheme = useCallback((theme: string) => {
		if (!isClient) return; // do nothing
		themeManager.updateTheme(theme);
		dispatchOrder(theme);

		unFocus(); // unFocus is clicked with mouse
	}, [isClient]);

	return (
		<div id={styles["theme-changer-wrapper"]}>
			<div id={styles["theme-changer"]} className={hidden? styles["hidden"]: undefined}>
				{
					order.map((buttonTheme) => (
						<button key={buttonTheme} id={buttonTheme} onClick={() => updateTheme(buttonTheme)}
						className={[themeSetting === buttonTheme? styles["selected"]: undefined, styles["pos-" + (1 + cssOrder.indexOf(buttonTheme))]].join(' ')}>
							<img src={getButtonIcon(buttonTheme)} className={theme === 'dark'? styles['inverted']: undefined} draggable="false" alt={`${buttonTheme}-mode`} />
						</button>
					))
				}
				{/* <button id={styles['light']} className={[themeSetting === 'light'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('light'))]].join(' ')} 
				onClick={() => updateTheme('light')}>
					<img src={lightModeIcon} className={theme === 'dark'? styles['inverted']: undefined} draggable="false" alt='light-mode' />
				</button>
				<button id={styles['dark']} className={[themeSetting === 'dark'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('dark'))]].join(' ')}
				onClick={() => updateTheme('dark')}>
					<img src={darkModeIcon} className={theme === 'dark'? styles['inverted']: undefined} draggable="false" alt='dark-mode' />
				</button>
				<button id={styles['system']} className={[themeSetting === 'system'? styles["selected"]: undefined, styles["pos-" + (1 + order.indexOf('system'))]].join(' ')}
				onClick={() => updateTheme('system')}>
					<img src={systemModeIcon} className={theme === 'dark'? styles['inverted']: undefined} draggable="false" alt='system-mode' />
				</button> */}
			</div>
		</div>
	)
}

export default ThemeChanger;