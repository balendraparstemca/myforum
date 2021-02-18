import axios from "axios";

const API_URL = process.env.REACT_APP_API_KEY

class CommonService {

    getCategory(obj) {
        return axios.post(API_URL + "common/category", obj).then((response) => {
            return response.data;
        });
    }


    getToptwoCategory(obj) {
        return axios.post(API_URL + "common/get_toptwocategory", obj).then((response) => {
            return response.data;
        });
    }

    getSubCategory(obj) {
        return axios.post(API_URL + "common/get_subcategory",obj).then((response) => {
            return response.data;
        });
    }

    getAmenties(catid) {
        return axios.get(API_URL + "common/amenties/" + catid).then((response) => {
           
            return response.data;
        });
    }


    addFlare(obj) {
        return axios.post(API_URL + "common/add_flare", obj).then((response) => {
            return response.data;
        });
    }

    getRules(obj) {
        return axios.post(API_URL + "common/rule",obj).then((response) => {
            return response.data;
        });
    }

    getCommunityFlair(comid) {
        return axios.get(API_URL + "common/flair/" + comid).then((response) => {
           
            return response.data;
        });
    }

    
    getNotification(obj) {
        return axios.post(API_URL + "common/get_notification", obj ).then((response) => {
            return response.data;
        });
    }

    addNotification(obj) {
        return axios.post(API_URL + "common/add_notification", obj ).then((response) => {
            return response.data;
        });
    }

    removeNotification(obj) {
        return axios.post(API_URL + "common/remove_notification", obj ).then((response) => {
            return response.data;
        });
    }

    subscribe(obj) {
        return axios.post(API_URL + "common/subscribe", obj ).then((response) => {
            return response.data;
        });
    }

    getPageseo(obj) {
        return axios.post(API_URL + "common/get_pageinfo", obj).then((response) => {
            return response.data;
        });
    }

    contact(obj) {
        return axios.post(API_URL + "common/add_contact", obj ).then((response) => {
            return response.data;
        });
    }


}

export default new CommonService();