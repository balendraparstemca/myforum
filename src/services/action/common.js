import { toast } from 'react-toastify';
import { GET_NOTIFICATION, ADD_NOTIFICATION, REMOVE_NOTIFICATION, FETCH_AMENTIES, FETCH_CATEGORY, FETCH_COMMUNITYLIST, FETCH_FLAIR_SUCCESS, FETCH_JOINED_COMMUNITYLIST, FETCH_RULE_FAILED, FETCH_RULE_SUCCESS, FETCH_USER_COMMUNITYLIST, SET_MESSAGE, GET_SUBCATEGORY, FETCH_TOP_CATEGORY, GET_PAGESEO } from "../actionType";
import CommonService from "../restapi/commonService";
import communityService from '../restapi/communityService';
import Compress from 'image-compressor';
import { post, get } from 'axios'
import store from "../../store";

export const MyimageCompressor = file => {
  return new Promise(resolve => {
    new Compress(file, {
      quality: 0.6,
      success: file => resolve(file),
      error: err => console.log(err.message),
    })
  })
}

export const defaultMeta = {
  title: 'Casual Desi is one of the largest Indian Digital services platforms for Indians across the globe.',
  
  meta: [
    {
      attribute: 'name',
      value: 'description',
      content: 'Casual Desi is a digital platform for Indians across the globe to find, coordinate, collaborate Indian stuff in and around them  We at Casual Desi are trying to be a single source of help and information for all Indian needs across the globe by matching 30+ million consumers with 50,000 listings across 200 categories in about 290 cities in 67 countries'
    }
  ]
}

export const getDefaultMeta = () => {
  return defaultMeta;
}





export const getGeoInfo = () => {
  return get('https://ipapi.co/json/').then((response) => {
    let data = response.data;

    const obj = {
      city: data.city.toLocaleLowerCase(),
      area: { lat: data.latitude, lang: data.longitude },
      state: data.region,
      country: data.country_name
    }

    store.dispatch(setlocation(obj))

    return Promise.resolve();
  }).catch((error) => {
    console.log(error);

    return Promise.reject();
  });
}



export const getPageinfo = (obj) => (dispatch) => {
  return CommonService.getPageseo(obj).then(
      (response) => {
          if (response.status === 'SUCCESS') {

              dispatch({
                  type: GET_PAGESEO,
                  payload: { pageinfo: response.data }
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


export const getAddress = async (latitude, longitude) => {
  //let { latitude, longitude } = pos.coords,
  let result = null;
  result = await post(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDq38-QJCuQZk8-QoTeuLO-diT-HCPohCA`
  )
  if (result) {
    const addressArray = result.data.results[0].address_components;

    const obj = {
      city: getCity(addressArray),
      area: { lat: latitude, lang: longitude },
      state: getState(addressArray),
      country: getCountry(addressArray)
    }
    store.dispatch(setlocation(obj))
    return obj;
  }

  return null

}


export const getCity = (addressArray) => {
  let city = '';
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
      city = addressArray[i].long_name;
      return city;
    }
  }
};

export const getArea = (addressArray) => {
  let area = '';
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0]) {
      for (let j = 0; j < addressArray[i].types.length; j++) {
        if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
          area = addressArray[i].long_name;
          return area;
        }
      }
    }
  }
};

export const getState = (addressArray) => {
  let state = '';
  for (let i = 0; i < addressArray.length; i++) {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
        state = addressArray[i].long_name;
        return state;
      }
    }
  }
};

export const getCountry = (addressArray) => {
  let country = '';
  for (let i = 0; i < addressArray.length; i++) {
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        return country;
      }
    }
  }
};

export const setlocation = (obj) => (dispatch) => {
  dispatch({
    type: 'CURRENT_LOCATION',
    payload: { mylocation: obj }
  });
}


export const fetchCategory = (obj) => (dispatch) => {
  return CommonService.getCategory(obj).then((response) => {

    if (response.status === 'SUCCESS') {

      dispatch({
        type: FETCH_CATEGORY,
        payload: { category: response.data }
      });

    }
    else {
      toast.error(response.message);
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

      toast.error(message + ' category not fecthed');
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );

}



export const fetchTopCategory = (obj) => (dispatch) => {
  return CommonService.getToptwoCategory(obj).then((response) => {

    if (response.status === 'SUCCESS') {

      dispatch({
        type: FETCH_TOP_CATEGORY,
        payload: { topcategory: response.data }
      });

    }
    else {
      toast.error(response.message);

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

      toast.error(message + ' top category not fecthed');


      return Promise.reject();
    }
  );

}


export const getAllSubCategory = (obj) => (dispatch) => {
  return CommonService.getSubCategory(obj).then(
    (response) => {


      if (response.status === 'SUCCESS') {

        dispatch({
          type: GET_SUBCATEGORY,
          payload: { subcategory: response.data }
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


export const fetchAmenties = (catid) => (dispatch) => {
  return CommonService.getAmenties(catid).then(
    (response) => {

      if (response.status === 'SUCCESS') {

        dispatch({
          type: FETCH_AMENTIES,
          payload: { amenties: response.data }
        });


      }
      else {
        toast.error(response.message);
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
      toast.error(message);
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );

}

export const fetchRules = (obj) => (dispatch) => {
  return CommonService.getRules(obj).then(
    (response) => {

      if (response.status === 'SUCCESS') {

        dispatch({
          type: FETCH_RULE_SUCCESS,
          payload: { rule: response.data }
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


export const fetchFlair = (comid) => (dispatch) => {
  return CommonService.getCommunityFlair(comid).then(
    (response) => {

      if (response.status === 'SUCCESS') {

        dispatch({
          type: FETCH_FLAIR_SUCCESS,
          payload: { flair: response.data }
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });

      }
      else {

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


      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );

}


export const fetchCommunityList = (obj) => (dispatch) => {

  return communityService.getComunnityList(obj).then(
    (response) => {

      if (response.status === 'SUCCESS') {

        dispatch({
          type: FETCH_COMMUNITYLIST,
          payload: { communitylist: response.data }
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });

      }
      else {


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



      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );

}

export const fetchUserCommunityList = (obj) => (dispatch) => {

  return communityService.getUserCreatedCommunityList(obj).then(
    (response) => {

      if (response.status === 'SUCCESS') {

        dispatch({
          type: FETCH_USER_COMMUNITYLIST,
          payload: { communitylist: response.data }
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

export const fetchJoinedCommunityList = (obj) => (dispatch) => {

  return communityService.getUserjoinedCommunityList(obj).then(
    (response) => {

      if (response.status === 'SUCCESS') {

        dispatch({
          type: FETCH_JOINED_COMMUNITYLIST,
          payload: { communitylist: response.data }
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


export const addFlaretags = (obj) => (dispatch) => {

  return CommonService.addFlare(obj).then(
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

export const addNotification = (obj) => (dispatch) => {
  return CommonService.addNotification(obj).then(
    (response) => {
      if (response.status === 'SUCCESS') {

        dispatch({
          type: ADD_NOTIFICATION,

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


export const removeNotification = (obj) => (dispatch) => {
  return CommonService.removeNotification(obj).then(
    (response) => {
      if (response.status === 'SUCCESS') {

        dispatch({
          type: REMOVE_NOTIFICATION,
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


export const getNotification = (obj) => (dispatch) => {
  return CommonService.getNotification(obj).then(
    (response) => {
      if (response.status === 'SUCCESS') {

        dispatch({
          type: GET_NOTIFICATION,
          payload: { notification: response.data }
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


export const Subscribe = (obj) => (dispatch) => {
  return CommonService.subscribe(obj).then(
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

export const contctto = (obj) => (dispatch) => {
  return CommonService.contact(obj).then(
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