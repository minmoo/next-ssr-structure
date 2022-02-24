import { RefObject, useEffect, useRef } from "react";

//TODO Observer 합치기 조건부 타입 사용?
const useIntersectionObserver = (
	elementRef: RefObject<HTMLElement>,
	callback: IntersectionObserverCallback,
	{ root = null, rootMargin = "0px", threshold = 0 }: IntersectionObserverInit,
) => {
	const current = elementRef && elementRef.current;
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const hasSupport = !!window.IntersectionObserver;
		if (!hasSupport || !current) return;

		if (observer && observer.current && current) {
			observer.current.unobserve(current);
		}

		const observe = () => {
			if (current && observer.current) {
				observer.current.observe(current);
			}
		};

		observer.current = new IntersectionObserver(callback, {
			root,
			rootMargin,
			threshold,
		});

		observe();

		return () => {
			if (observer && observer.current && current) {
				observer.current.unobserve(current);
			}
		};
	}, [callback, root, rootMargin, elementRef, threshold, current]);
};

export default useIntersectionObserver;
