import { RefObject, useEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

/**
 * element의 크기 변화를 감지하는 observer
 * @param param0 {callback: Function, element: ref}
 */
const useResizeObserver = (
	elementRef: RefObject<HTMLElement>,
	callback: ResizeObserverCallback,
) => {
	const current = elementRef && elementRef.current;
	const observer = useRef<ResizeObserver | null>(null);

	useEffect(() => {
		// if we are already observing old element
		if (observer && observer.current && current) {
			observer.current.unobserve(current);
		}

		const observe = () => {
			if (current && observer.current) {
				observer.current.observe(current);
			}
		};

		const resizeObserverOrPolyfill = ResizeObserver;
		observer.current = new resizeObserverOrPolyfill(callback);
		observe();

		return () => {
			if (observer && observer.current && current) {
				observer.current.unobserve(current);
			}
		};
	}, [callback, current, elementRef]);
};

export default useResizeObserver;
