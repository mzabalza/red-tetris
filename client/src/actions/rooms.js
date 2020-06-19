import { LOAD_ROOMS } from './types';


export const getRooms = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                status: err.response.status,
                msg: err.response.statusText
            }
        });
    }

}
