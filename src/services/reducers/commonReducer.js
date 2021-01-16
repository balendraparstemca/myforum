import { FETCH_AMENTIES, FETCH_CATEGORY, FETCH_FLAIR_SUCCESS, FETCH_RULE_SUCCESS, GET_SUBCATEGORY } from "../actionType";

const initialState = { amenties: [], isFetched: false, category: [],subcategory:[], flair: [], rule: [] };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_CATEGORY:
            return {
                ...state,
                category: payload.category,
            }

        case GET_SUBCATEGORY:
            return {
                ...state,
                subcategory: payload.subcategory,

            };

        case FETCH_AMENTIES:
            return {
                ...state,
                amenties: payload.amenties,
            };

        case FETCH_RULE_SUCCESS:
            return {
                ...state,
                isFetched: true,
                rule: payload.rule,
            };

        case FETCH_FLAIR_SUCCESS:
            return {

                ...state,
                flair: payload.flair,
            };

        default:
            return state;

    }
}