import { toast } from 'react-toastify';
import { ADD_LIST_AMENTIES, CREATE_LISTING, GET_LIST_IMAGE, GET_LIST_AMENTIES, GET_LIST_DETAIL, GET_LIST_FULLDETAIL, SET_MESSAGE, UPDATE_LISTINGDETAIL, ADD_LIST_SHEDULE, GET_LIST_SHEDULE, POST_LIST_REVIEW, GET_LIST_REVIEW, GET_USER_LIST, GET_USER_SAVE_LIST, GET_HOME_LIST, GET_CATEGORY_LIST, GET_PEOPLE_VIEWED_LIST, GET_SIMILAR_LIST, GET_SEARCH_LIST, GET_MAINCATEGORY_LIST, GET_LIST_OTHERS } from '../actionType';
import ListService from "../restapi/listService";


export const CreateListing = (obj) => (dispatch) => {


    return ListService.createList(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: CREATE_LISTING,
                    payload: { list: response.data }
                });
                localStorage.setItem("createdlist", JSON.stringify({ listingid: response.data ? response.data.listing_id : null, subcat_id: response.data.subcat_id, step: 0 }));
                toast.success(response.message)

            }
            else {
                toast.error(response.message)

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.message,
                });
            }

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const nextupdate = (obj) => (dispatch) => {

    dispatch({
        type: 'NEXT',
        payload: { next: obj ? obj : false }
    })

    return
}

export const getListingother = (obj) => (dispatch) => {

    return ListService.getlistothers(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: GET_LIST_OTHERS,
                    payload: { listother: response.data }
                });

                toast.success(response.message)

            }
            else {
                toast.warning(response.message)

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.message,
                });
            }

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const addListingother = (obj) => (dispatch) => {

    return ListService.addlistothers(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {


                toast.success(response.message)

            }
            else {
                toast.warning(response.message)

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.message,
                });
            }

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const deleteListingother = (obj) => (dispatch) => {

    return ListService.removelistothers(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: GET_LIST_OTHERS,
                    payload: { listother: response.data }
                });

                toast.success(response.message)

            }
            else {
                toast.warning(response.message)

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.message,
                });
            }

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const UpdateListing = (obj) => (dispatch) => {

    return ListService.updateList(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: CREATE_LISTING,
                    payload: { list: response.data }
                });

                toast.success(response.message)

            }
            else {
                toast.warning(response.message)

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.message,
                });
            }

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const UpdateListingdetail = (obj) => (dispatch) => {

    return ListService.updateListdetail(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: UPDATE_LISTINGDETAIL,

                });

                dispatch({
                    type: 'NEXT',
                    payload: { next: true }

                });

                toast.success(response.message)

            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}




export const AddListAmenties = (obj) => (dispatch) => {

    return ListService.addListAmenties(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: ADD_LIST_AMENTIES,

                });

                toast.success(response.message)

            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const getListAmenties = (obj) => (dispatch) => {

    return ListService.getlistAmenties(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: GET_LIST_AMENTIES,
                    payload: { amenties: response.data }

                });



            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}



export const getListDetail = (obj) => (dispatch) => {


    return ListService.getlistdetail(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {
                dispatch({
                    type: GET_LIST_DETAIL,
                    payload: { listdetail: response.data }

                });



            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}




export const getListFullDetail = (obj) => (dispatch) => {

    return ListService.getlistfulldetail(obj).then(
        (response) => {

            if (response.status === 'SUCCESS') {
                dispatch({
                    type: GET_LIST_FULLDETAIL,
                    payload: { listfulldetail: response.data }

                });



            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const mapAmentiestoList = (obj) => (dispatch) => {

    return ListService.maplistAmenties(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {


                toast.success(response.message)

            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const unmapAmentiestoList = (obj) => (dispatch) => {

    return ListService.unmaplistAmenties(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {


                toast.success(response.message)

            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}



export const removeImageList = (obj) => (dispatch) => {

    return ListService.removeListImage(obj).then(
        (response) => {
            toast.success(response)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const addImageListprofile = (formdata, listingid) => (dispatch) => {

    return ListService.addlistProfileImage(formdata, listingid).then(
        (response) => {
            toast.success('successfully added image')

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const addImageList = (formdata, listingid) => (dispatch) => {

    return ListService.addImage(formdata, listingid).then(
        (response) => {

            dispatch({
                type: 'NEXT',
                payload: { next: true }
            });
            toast.success('successfully added image')

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const remveListshedule = (obj) => (dispatch) => {

    return ListService.removelistshedule(obj).then(
        (response) => {
            toast.success('successfully added image')

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}



export const saveList = (obj) => (dispatch) => {

    return ListService.saveListing(obj).then(
        (response) => {
            toast.success(response.message)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}



export const viewList = (obj) => (dispatch) => {

    return ListService.viewListing(obj).then(
        (response) => {


            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const likeList = (obj) => (dispatch) => {

    return ListService.likeListing(obj).then(
        (response) => {
            toast.success(response.message)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const reportList = (obj) => (dispatch) => {

    return ListService.reportList(obj).then(
        (response) => {
            toast.success(response.message)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}




export const addListShedule = (obj) => (dispatch) => {

    return ListService.addlistshedule(obj).then(
        (response) => {

            dispatch({
                type: ADD_LIST_SHEDULE,

            });

           
            toast.success('successfully added shedule')

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const deleteListShedule = (obj) => (dispatch) => {

    return ListService.removelistshedule(obj).then(
        (response) => {

            toast.success(response.message)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const getListShedule = (obj) => (dispatch) => {

    return ListService.getlistshedule(obj).then(
        (response) => {


            dispatch({
                type: GET_LIST_SHEDULE,
                payload: { listshedule: response.data }

            });


            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const addListReview = (obj) => (dispatch) => {

    return ListService.reviewlist(obj).then(
        (response) => {

            dispatch({
                type: POST_LIST_REVIEW,

            });
            toast.success(response.message)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const userUnsaveList = (obj) => (dispatch) => {

    return ListService.unsaveList(obj).then(
        (response) => {

            toast.success(response.message)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const gethomeList = () => (dispatch) => {

    return ListService.getHomeList().then(
        (response) => {


            dispatch({
                type: GET_HOME_LIST,
                payload: { homelist: response.data }

            });

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const getsearchList = (obj) => (dispatch) => {

    return ListService.getsearchList(obj).then(
        (response) => {


            dispatch({
                type: GET_SEARCH_LIST,
                payload: { searchlist: response.data }

            });

            toast.success(response.message)

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}



export const getpeopleviewList = (obj) => (dispatch) => {

    return ListService.getpeopleviewList(obj).then(
        (response) => {


            dispatch({
                type: GET_PEOPLE_VIEWED_LIST,
                payload: { viewlist: response.data }

            });



            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const getsimilarviewList = (obj) => (dispatch) => {

    return ListService.getsimilarList(obj).then(
        (response) => {


            dispatch({
                type: GET_SIMILAR_LIST,
                payload: { similarlist: response.data }

            });



            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const getlistreview = (obj) => (dispatch) => {

    return ListService.getReviewList(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {

                dispatch({
                    type: GET_LIST_REVIEW,
                    payload: { reviewlist: response.data }
                });


            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}







export const getlistimage = (obj) => (dispatch) => {

    return ListService.getlistImages(obj).then(
        (response) => {
            if (response.status === 'SUCCESS') {

                dispatch({
                    type: GET_LIST_IMAGE,
                    payload: { listimage: response.data }
                });


            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}




export const getuserlist = (id) => (dispatch) => {

    return ListService.getuserList(id).then(
        (response) => {
            if (response.status === 'SUCCESS') {

                dispatch({
                    type: GET_USER_LIST,
                    payload: { userlist: response.data }
                });


            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}


export const getmylist = (id) => (dispatch) => {

    return ListService.getmyList(id).then(
        (response) => {
            if (response.status === 'SUCCESS') {

                dispatch({
                    type: GET_USER_LIST,
                    payload: { userlist: response.data }
                });


            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}




export const getusersavedlist = (id) => (dispatch) => {

    return ListService.getusersavedList(id).then(
        (response) => {
            if (response.status === 'SUCCESS') {

                dispatch({
                    type: GET_USER_SAVE_LIST,
                    payload: { savedlist: response.data }
                });


            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}





export const getCategorylist = (id) => (dispatch) => {

    return ListService.getCategoryList(id).then(
        (response) => {
            if (response.status === 'SUCCESS') {

                dispatch({
                    type: GET_CATEGORY_LIST,
                    payload: { catlist: response.data }
                });


            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}

export const getMainCategorylist = (id) => (dispatch) => {

    return ListService.getmainCategoryList(id).then(
        (response) => {

            if (response.status === 'SUCCESS') {

                dispatch({
                    type: GET_MAINCATEGORY_LIST,
                    payload: { maincatlist: response.data }
                });


            }
            else {
                toast.error(response.message)

            }

            return Promise.resolve();
        },
        (error) => {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message)

            return Promise.reject();
        }
    );

}