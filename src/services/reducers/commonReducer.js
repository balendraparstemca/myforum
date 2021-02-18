import { FETCH_AMENTIES, FETCH_CATEGORY, FETCH_FLAIR_SUCCESS, FETCH_RULE_SUCCESS, FETCH_TOP_CATEGORY, GET_PAGESEO, GET_SUBCATEGORY } from "../actionType";

const initialState = { mylocation: undefined, pageinfo: [], steplist: { ishide: false, listiid: null, subcat_id: '' }, amenties: [], isFetched: false, category: [], topcategory: [], subcategory: [], flair: [], rule: [] };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case FETCH_CATEGORY:
            return {
                ...state,
                category: payload.category,
            }

        case 'NEXT':
            return {
                ...state,
                steplist: { ishide: true, listid: payload.listingid, subcat_id: payload.subcat_id },
            }


        case 'CURRENT_LOCATION':
            return {
                ...state,
                mylocation: payload.mylocation
            }

        case GET_PAGESEO: {

            return {
                ...state,
                pageinfo: payload.pageinfo
            }
        }

        case FETCH_TOP_CATEGORY:
            return {
                ...state,
                topcategory: payload.topcategory,
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