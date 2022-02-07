import { RefObject, useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

interface IuseResizeObserver {
	callback: ResizeObserverCallback;
	element: RefObject<any>;
}

/**
 * element의 크기 변화를 감지하는 observer
 * @param param0 {callback: Function, element: ref}
 */
const useResizeObserver = ({ callback, element }: IuseResizeObserver) => {
	const current = element && element.current;
	const observer = useRef<ResizeObserver | null>(null);

	useEffect(() => {
		// if we are already observing old element
		if (observer && observer.current && current) {
			observer.current.unobserve(current);
		}

		const observe = () => {
			if (element && element.current && observer.current) {
				observer.current.observe(element.current);
			}
		};

		const resizeObserverOrPolyfill = ResizeObserver;
		observer.current = new resizeObserverOrPolyfill(callback);
		observe();

		return () => {
			if (observer && observer.current && element && element.current) {
				observer.current.unobserve(element.current);
			}
		};
	}, [callback, current, element]);
};

export default useResizeObserver;
