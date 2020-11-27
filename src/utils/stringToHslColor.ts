export default (str: string, saturation = 50, light = 60): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, ${Math.max(0, Math.min(saturation, 100))}%, ${Math.max(0, Math.min(light, 100))}%)`;
};
