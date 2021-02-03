import {
  STREAM_LIST_REQUEST,
  STREAM_LIST_SUCCESS,
  STREAM_LIST_FAIL,
  LIKE_STREAM_REQUEST,
  LIKE_STREAM_SUCCESS,
  UNLIKE_STREAM_SUCCESS,
  UNLIKE_STREAM_REQUEST,
  UNLIKE_STREAM_FAIL,
  LIKE_STREAM_FAIL,
  STREAM_DELETE_REQUEST,
  STREAM_DELETE_SUCCESS,
  STREAM_DELETE_FAIL,
  STREAM_CREATE_REQUEST,
  STREAM_CREATE_SUCCESS,
  STREAM_CREATE_FAIL,
  STREAM_DETAILS_REQUEST,
  STREAM_DETAILS_SUCCESS,
  STREAM_DETAILS_FAIL,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
} from "../constants/streamConstants";
import axios from "axios";

export const listStreams = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STREAM_LIST_REQUEST });
    const { data } = await axios.get(`/api/streams`);
    dispatch({ type: STREAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STREAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likeStream = (streamID, index) => async (dispatch, getState) => {
  const currentItem = { index };
  try {
    dispatch({ type: LIKE_STREAM_REQUEST, payload: index });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.get(`/api/streams/${streamID}/like`, config);
    dispatch({
      type: LIKE_STREAM_SUCCESS,
      payload: { data, ...currentItem },
    });
  } catch (error) {
    dispatch({
      type: LIKE_STREAM_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        ...currentItem,
      },
    });
  }
};
export const unlikeStream = (streamID, index) => async (dispatch, getState) => {
  const currentItem = { index };
  try {
    dispatch({ type: UNLIKE_STREAM_REQUEST, payload: index });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.get(`/api/streams/${streamID}/unlike`, config);

    dispatch({
      type: UNLIKE_STREAM_SUCCESS,
      payload: { data, ...currentItem },
    });
  } catch (error) {
    dispatch({
      type: UNLIKE_STREAM_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        ...currentItem,
      },
    });
  }
};

export const deleteStream = (id, index) => async (dispatch, getState) => {
  const currentItem = { index };
  try {
    dispatch({ type: STREAM_DELETE_REQUEST, payload: index });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/streams/${id}`, config);
    dispatch({
      type: STREAM_DELETE_SUCCESS,
      payload: index,
    });
  } catch (error) {
    dispatch({
      type: STREAM_DELETE_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        ...currentItem,
      },
    });
  }
};

export const deleteComment = (commentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST, payload: commentData });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(
      `/api/streams/comment/delete?streamID=${commentData.streamId}&commentID=${commentData.commentId}`,
      config
    );
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: commentData,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        ...commentData,
      },
    });
  }
};

export const createStream = ({ body }) => async (dispatch, getState) => {
  try {
    dispatch({ type: STREAM_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/streams`, { body }, config);
    dispatch({
      type: STREAM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STREAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createComment = (streamId, { body }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/streams/${streamId}/comment`,
      { body },
      config
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const streamDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STREAM_DETAILS_REQUEST });
    /*
    const {userLogin: { userInfo },} = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/streams/${id}`, config);
   */
    dispatch({ type: STREAM_DETAILS_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: STREAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/*
export const clearMessage = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_CLEAR_MESSAGE });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const productCreate = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productUpdate = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
    });
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productCreateReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/products/${productId}/reviews`, review, config);
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productTopRated = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_RATED_REQUEST });
    const { data } = await axios.get(`/api/products/top`);
    dispatch({ type: PRODUCT_TOP_RATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_RATED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
*/
