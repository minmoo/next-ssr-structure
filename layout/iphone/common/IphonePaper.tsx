import { Paper, styled, PaperProps } from "@mui/material";
import { MIN_PAPER_HEIGHT } from "@lib/constants/base";
import { forwardRef } from "react";

interface IphonePaperProps {
	transitionMs?: number;
	transparent?: boolean;
	full?: boolean;
}

const IphonePaper = forwardRef<HTMLDivElement, PaperProps & IphonePaperProps>(
	function IphonePaper(
		{
			children,
			transitionMs = 0,
			transparent = false,
			full = false,
			sx = [],
			...rest
		},
		ref,
	) {
		return (
			<Paper
				sx={[
					{
						position: "absolute",
						top: 0,
						left: "50%",
						p: "0 30px",
						...(full && {
							height: "100vh",
						}),
						width: "100%",
						...(transparent && {
							background: "rgba(0, 0, 0, 0)", //child를 제외하고 parent만 투명효과를 주기위해 사용
						}),
						minHeight: MIN_PAPER_HEIGHT,
						willChange: "transform",
						transition:
							transitionMs > 0
								? `transform ${transitionMs}ms ease-in-out`
								: "none",
					},

					//passing sx prop
					// cannot spread 'sx' directly because 'SxProps' can be an array
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				style={{
					transform: "translate(-50%, 0)",
				}}
				ref={ref}
				{...rest}
			>
				{children}
			</Paper>
		);
	},
);

export default IphonePaper;
