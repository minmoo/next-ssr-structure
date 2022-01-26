import { DoubleArrowTwoTone } from "@mui/icons-material";
import { current } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { cloneElement } from "react";
import { createRef } from "react";
import { useRef } from "react";
import { useState } from "react";

const ParallaxWrapper = (WrappedComponent, weight) => {
	const Component = (props) => {
		const [ease, setEase] = useState(weight);

		const ref = useRef(null);
		const startPosition = useRef();
		const lastOffset = useRef(0);
		const animationRunning = useRef(false);

		useEffect(() => {
			document.addEventListener("scroll", animateScroll);
		}, []);

		const callbackRef = (element) => {
			if (!ref.current) {
				ref.current = element;
			}

			if (element !== null) {
				startPosition.current = element.offsetTop;
			}
		};

		const animateScroll = () => {
			if (!animationRunning.current) {
				animationRunning.current = true;
				requestAnimationFrame(animationLoop);
			}
		};

		const animationLoop = () => {
			// console.log("aaa");
			const currentOffset = window.scrollY;
			let diff = currentOffset - lastOffset.current;
			diff *= ease;

			if (Math.abs(diff) < 0.05) {
				lastOffset.current = currentOffset;
				animationRunning.current = false;
				return;
			}

			ref.current.style.top = `${
				startPosition?.current - lastOffset.current
			}px`;

			lastOffset.current += diff;

			requestAnimationFrame(animationLoop);
		};

		return cloneElement(WrappedComponent, {
			...WrappedComponent.props,
			ref: callbackRef,
		});
	};

	return Component;
};

export default ParallaxWrapper;
