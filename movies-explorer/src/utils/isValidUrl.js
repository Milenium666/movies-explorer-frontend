//проверяет валидный  url
const isValidUrl = (url) => {
    try {
        //подставить url
        new URL(url);

    } catch {
        //если не валидный вернуть false
        return false
    }
    //в ином случае вернуть true
    return true;
} 

export default isValidUrl;