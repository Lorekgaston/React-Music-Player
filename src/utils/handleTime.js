export const parseTime = time => {
    let newTime = parseFloat(time);

    if (Array.isArray(time)) {
        let fullTime = time.reduce((a, b) => a + b, 0);
        let hours = Math.floor((fullTime / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((fullTime / (1000 * 60)) % 60);

        fullTime = `${hours} h ${minutes} m`;

        return fullTime;
    }

    if (Number.isInteger(newTime)) {
        let minutes = Math.floor(newTime / 60000);
        let seconds = ((newTime % 60000) / 1000).toFixed(0);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        newTime = `${minutes}:${seconds}`;
    } else {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        newTime = `${minutes}:${seconds}`;
    }

    return newTime;
};
