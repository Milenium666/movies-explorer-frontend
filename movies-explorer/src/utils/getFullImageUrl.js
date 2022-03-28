import isValidUrl from "./isValidUrl";
import { MOVIES_API } from '../constants';

const getFullImageUrl = (params) => {
    if(isValidUrl(params)) {
        return params;
    }
    return `${MOVIES_API}${params.url}`;
};
export default getFullImageUrl;