const convertDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);
    if( hours >= 1 ) {
        return `${hours}ч ${minutes}м`;
    } else {
        return `${minutes}м`
    }
}

export default convertDuration;