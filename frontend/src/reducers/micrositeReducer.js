import { IS_MICROSITE_ACCESS } from "../constants/micrositeConstants";

export const micrositeReducer = (state = false, action) => {
    switch (action.type) {
        case IS_MICROSITE_ACCESS:
            return action.payload;
        default:
            return state;
    }
};

