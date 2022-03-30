import isValidUrl from "./isValidUrl";
import {MOVIE_API} from '../constants';


const getFullImageUrl = (params) => {
    if(isValidUrl(params)) {
        return params;
    }
    return `${MOVIE_API}${params.url}`;
};
export default getFullImageUrl;