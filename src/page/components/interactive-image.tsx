import { useCallback, useContext } from "react";
import LazyLoad from "../../helper-functions/lazy-load";

import unFocus from "../../helper-functions/unFocus";

import { ImageInfo } from "./selected-image";
import { SelectedImageContext } from "../root";

import transitionStyles from "../transitions.module.css";
import styles from "./interactive-image.module.css";

function InteractiveImage({ image, customStyle }: { image: ImageInfo, customStyle?: string }) {
	const { setShowImage, setSelectedImage } = useContext(SelectedImageContext);

	const onImageClick = useCallback((showImage: boolean) => {
		setShowImage(showImage);

		unFocus(); // unFocus is clicked with mouse
	}, []);

	return (
		<div className={[styles["image-parent"], transitionStyles["interactive"], transitionStyles["clickable"], transitionStyles["rounded-square"], customStyle].join(' ')}>
			<LazyLoad height={image.height} scrollContainer="#main-page" offset={300} once>
				<img className={styles["image"]} 
					src={image.src} alt={image.alt} height={image.height} 
					onClick={() => {setSelectedImage(image); onImageClick(true);}} onMouseOver={() => setSelectedImage(image)}/>
			</LazyLoad>
		</div>
	);
}

export default InteractiveImage;