import useWindowDimensions from './useWindowDimensions';

interface PosterDimensionsOptions {
    breakpointWidths?: [number?, number?, number?];
    breakpointHeights?: [number?, number?, number?];
    factor?: number;
}

export default function usePosterDimensions({
    breakpointWidths,
    breakpointHeights,
    factor = 1.5,
}: PosterDimensionsOptions = {}) {
    const { width: windowWidth } = useWindowDimensions();

    const getBreakpointIndex = () => {
        if (windowWidth < 500) return 0;
        if (windowWidth < 900) return 1;
        return 2;
    };

    const index = getBreakpointIndex();
    const defaultHeights: [number, number, number] = [100, 120, 150];

    let height: number;
    let width: number;

    if (breakpointHeights?.[index] !== undefined) {
        height = breakpointHeights[index]!;
        width = height / factor;
    } else if (breakpointWidths?.[index] !== undefined) {
        width = breakpointWidths[index]!;
        height = width * factor;
    } else {
        height = defaultHeights[index];
        width = height / factor;
    }

    return {
        width,
        height,
    };
}
