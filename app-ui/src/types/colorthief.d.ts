declare module 'colorthief' {
    class ColorThief {
        getColor(image: HTMLImageElement): [number, number, number];
        getPalette(image: HTMLImageElement, colorCount: number): [number, number, number][];
    }

    export default ColorThief;
}