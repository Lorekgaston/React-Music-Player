export const convetTominutes = milliSeconds => {
    let minutes = Math.floor(milliSeconds / 60000);
    let seconds = ((milliSeconds % 60000) / 1000).toFixed(0);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
};
