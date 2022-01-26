import { useEffect, useRef } from "react";

const UNIT = ["px", "%", "deg"];

interface TransformObj {
	[key: string]: Array<string>;
}

const parseTransform = (transform: string): TransformObj => {
	return Array.from(transform.matchAll(/(\w+)\((.+?)\)/gm)).reduce(
		(agg, [, fn, val]) => ({
			...agg,
			[fn]: val.split(","),
		}),
		{},
	);
};

const stringTransform = (obj: TransformObj) => {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => (acc += `${key}(${value.join(",")}) `),
		"",
	);
};

const getNumAndUnit = (speed: string): [number, string] => {
	const numSpeed = parseFloat(speed);
	const unit = speed.replace(String(numSpeed), "");
	if (UNIT.includes(unit)) {
		return [numSpeed, unit];
	}

	return [numSpeed, "px"];
};

const directionKeyMap = {
	left: "translate",
	right: "translate",
	up: "translate",
	down: "translate",
	spin: "rotateY",
};

export interface ParallaxWrapProps {
	callbackRef: (element: any) => void;
}

/**
 * rotateY 와 translateX, translateY만 지원한다. -> replace 만 한다 -> diff로 바꿔야한다?
 * @param WrappedComponent
 * @param start number
 * @param end number
 * @param speed number
 * @returns Component
 */

//TODO list 받을 수 있게 변경해야한다
/*
  options: [
    {direction: 'left', start: 0, end: 10, speed: '10px'},
    {direction: 'right', start: 0, end: 10, speed: '10px'}
  ]
*/
const ParallaxWrapper = <P extends ParallaxWrapProps>(
	WrappedComponent: (props: P) => JSX.Element,
	direction: "left" | "right" | "up" | "down" | "spin",
	start: number,
	end: number,
	speed: string,
) => {
	const Component = (props: any) => {
		const ref = useRef<any>(null);
		const initialRef = useRef<string>("");
		const parseRef = useRef<TransformObj | null>(null);
		const dynamicRef = useRef<boolean>(false);

		const [speedNum, unit] = getNumAndUnit(speed);

		useEffect(() => {
			document.addEventListener("scroll", animateScroll);
			return () => document.removeEventListener("scroll", animateScroll);
		}, []);

		const setRatio = (ratio: number) => {
			const transformKey = directionKeyMap[direction];
			const value = parseRef?.current?.[transformKey];

			if (!value) {
				return;
			}

			if (direction === "right" || direction === "up") {
				ratio *= -1;
			}

			if (
				direction === "left" ||
				direction === "right" ||
				direction === "spin"
			) {
				value[0] = ratio + unit;
			} else {
				//up, down
				value[1] = ratio + unit;
			}
		};

		const animateScroll = () => {
			const offset = window.scrollY;
			if (ref.current && initialRef.current && parseRef.current) {
				if (offset < start) {
					//중복처리를 막기 위해
					if (ref.current.style.transform !== initialRef.current) {
						ref.current.style.transform = initialRef.current;
					}
				} else if (offset >= start && offset < end) {
					dynamicRef.current = true;
					const realOffset = offset - start;
					const ratio = speedNum * realOffset;
					setRatio(ratio);

					ref.current.style.transform = stringTransform(parseRef.current);
				} else {
					//중복처리를 막기위해
					if (dynamicRef.current) {
						dynamicRef.current = false;
						const realOffset = end - start;
						const ratio = speedNum * realOffset;
						setRatio(ratio);
						ref.current.style.transform = stringTransform(parseRef.current);
					}
				}
			}
		};

		const initTransform = (style: string) => {
			if (style !== "none") {
				return parseTransform(style);
			}

			const key = directionKeyMap[direction];
			return {
				[key]: key === "translate" ? ["0px", "0px"] : ["0deg"],
			};
		};

		const callbackRef = (element: any) => {
			//생길때 사라질때 발생하므로 체크해야한다.
			if (!ref.current) {
				ref.current = element;
			}

			if (element !== null) {
				initialRef.current = element.style.transform || "none";
				parseRef.current = initTransform(initialRef.current);
			}
		};

		return <WrappedComponent {...props} callbackRef={callbackRef} />;
	};

	return Component;
};

export default ParallaxWrapper;
