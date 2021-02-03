import {
  STREAM_LIST_REQUEST,
  STREAM_LIST_SUCCESS,
  STREAM_LIST_FAIL,
  LIKE_STREAM_SUCCESS,
  LIKE_STREAM_REQUEST,
  LIKE_STREAM_FAIL,
  UNLIKE_STREAM_SUCCESS,
  UNLIKE_STREAM_REQUEST,
  UNLIKE_STREAM_FAIL,
  STREAM_DELETE_SUCCESS,
  STREAM_CREATE_REQUEST,
  STREAM_CREATE_SUCCESS,
  STREAM_CREATE_FAIL,
  STREAM_CREATE_RESET,
  STREAM_DETAILS_REQUEST,
  STREAM_DETAILS_SUCCESS,
  STREAM_DETAILS_FAIL,
  STREAM_DETAILS_RESET,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_RESET,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_REQUEST,
  USER_CREATE_COMMENT_REQUEST,
  USER_STREAM_LIST_FAIL,
  USER_STREAM_CREATE_FAIL,
  USER_STREAM_CREATE_SUCCESS,
  USER_STREAM_CREATE_RESET,
  USER_STREAM_CREATE_REQUEST,
  USER_UNLIKE_STREAM_SUCCESS,
  USER_LIKE_STREAM_SUCCESS,
  USER_STREAM_DELETE_SUCCESS,
  USER_STREAM_LIST_SUCCESS,
  USER_UNLIKE_STREAM_REQUEST,
  USER_LIKE_STREAM_REQUEST,
  USER_STREAM_LIST_REQUEST,
  USER_STREAM_DETAILS_FAIL,
  USER_STREAM_DETAILS_RESET,
  USER_STREAM_DETAILS_SUCCESS,
  USER_STREAM_DETAILS_REQUEST,
  USER_CREATE_COMMENT_FAIL,
  USER_CREATE_COMMENT_RESET,
  USER_CREATE_COMMENT_SUCCESS,
  STREAM_DELETE_REQUEST,
  STREAM_DELETE_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
} from "../constants/streamConstants";

export const streamListReducer = (
  state = {
    streams: [],

    stream: {},
    streamStreamDetails: {},
    streamCreateComment: {},
  },
  action
) => {
  switch (action.type) {
    case STREAM_LIST_REQUEST:
      return {
        streams: [],
        loading: true,
        error: null,
      };

    case STREAM_LIST_SUCCESS:
      return {
        loading: false,
        streams: action.payload.streams,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    ////////////////////////////////////////////////////////
    ///////////////CREATE COMMENT///////////////////////////
    ////////////////////////////////////////////////////////
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loadingCreateComment: true,
        errorCreateComment: null,
      };
    case CREATE_COMMENT_SUCCESS:
      const a = state.streams.findIndex((stream) => {
        return stream._id === action.payload.updatedStream._id;
      });
      state.streams[a] = action.payload.updatedStream;
      return {
        ...state,
        streams: {
          comments: [action.payload.comments, ...state.streams.comments],
        },
        loadingCreateComment: false,
      };
    case CREATE_COMMENT_RESET:
      return {
        ...state,
        loadingCreateComment: false,
        errorCreateComment: null,
      };
    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        loadingCreateComment: false,
        errorCreateComment: action.payload,
      };
    //////////////////////////////////////////////////////
    ///////////////////END OF COMMENT CREATION
    //////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    ///////////////MANUPULATE STREAM DETAILS////////////////
    ///////////////////////////////////////////////////////
    case STREAM_DETAILS_REQUEST:
      return {
        ...state,
        loadingStreamDetails: true,
        errorStreamDetails: null,
      };
    case STREAM_DETAILS_SUCCESS:
      const ab = state.streams.findIndex((stream) => {
        return stream._id === action.payload;
      });
      return {
        ...state,
        loadingStreamDetails: false,
        streamStreamDetails: state.streams[ab],
      };
    case STREAM_DETAILS_RESET:
      return {
        ...state,
        loadingStreamDetails: false,
        errorStreamDetails: null,
      };
    case STREAM_DETAILS_FAIL:
      return {
        ...state,
        loadingStreamDetails: false,
        errorStreamDetails: action.payload,
      };
    //////////////////////////////////////////////////////
    /////////END OF STREAM DETAILS MANUPULARTION//////////
    //////////////////////////////////////////////////////

    //////////////////////////////////////////////////////
    //////////////////MANUPULATE DELETE STREAM////////////
    /////////////////////////////////////////////////////
    case STREAM_DELETE_REQUEST:
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload),
          {
            ...state.streams[action.payload],
            loadingDelete: true,
            errorDelete: null,
          },
          ...state.streams.slice(action.payload + 1),
        ],
      };

    case STREAM_DELETE_SUCCESS:
      state.streams.splice(action.payload, 1);
      return {
        ...state,
      };

    case STREAM_DELETE_FAIL:
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload.index),
          {
            ...state.streams[action.payload.index],
            loadingDelete: false,
            errorDelete: action.payload.error,
          },
          ...state.streams.slice(action.payload.index + 1),
        ],
      };
    //////////////////////////////////////////////////////
    //////////////////END OF DELETE STREAM////////////
    /////////////////////////////////////////////////////

    //////////////////////////////////////////////////////
    //////////////////MANUPULATE DELETE COMMENT////////////
    /////////////////////////////////////////////////////
    case DELETE_COMMENT_REQUEST:
      const shorten = action.payload;
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, shorten.index),
          {
            ...state.streams[shorten.index],
            comments: [
              ...state.streams[shorten.index].comments.slice(
                0,
                shorten.commentIndex
              ),
              {
                ...state.streams[shorten.index].comments[shorten.commentIndex],
                commentLoading: true,
                commentError: null,
              },
              ...state.streams[shorten.index].comments.slice(
                shorten.commentIndex + 1
              ),
            ],
          },
          ...state.streams.slice(shorten.index + 1),
        ],
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload.index),
          {
            ...state.streams[action.payload.index],
            commentCount: state.streams[action.payload.index].commentCount - 1,
            comments: [
              ...state.streams[action.payload.index].comments.slice(
                0,
                action.payload.commentIndex
              ),
              ////////////////////////////////////
              //remove the selected comment
              ////////////////////////////////////

              ...state.streams[action.payload.index].comments.slice(
                action.payload.commentIndex + 1
              ),
            ],
          },
          ...state.streams.slice(action.payload.index + 1),
        ],
      };

    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload.index),
          {
            ...state.streams[action.payload.index],
            comments: [
              ...state.streams[action.payload.index].comments.slice(
                0,
                action.payload.commentIndex
              ),
              {
                ...state.streams[action.payload.index].comments[
                  action.payload.commentIndex
                ],
                commentLoading: false,
                commentError: action.payload.error,
              },
              ...state.streams[action.payload.index].comments.slice(
                action.payload.commentIndex + 1
              ),
            ],
          },
          ...state.streams.slice(action.payload.index + 1),
        ],
      };
    //////////////////////////////////////////////////////
    //////////////////END OF DELETE COMMENT////////////
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    ///////////////MANUPULATE LIKE STREAM////////////////
    ////////////////////////////////////////////////////
    case LIKE_STREAM_REQUEST:
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload),
          {
            ...state.streams[action.payload],
            loadingLike: true,
            errorLike: null,
          },
          ...state.streams.slice(action.payload + 1),
        ],
      };
    case LIKE_STREAM_SUCCESS:
      const i = state.streams.findIndex((stream) => {
        return stream._id === action.payload.data.updatedStream._id;
      });
      state.streams[action.payload.index].loadingLike = false;
      state.streams[i] = action.payload.data.updatedStream;
      return {
        ...state,
      };
    case LIKE_STREAM_FAIL:
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload.index),
          {
            ...state.streams[action.payload.index],
            loadingLike: false,
            errorLike: action.payload.error,
          },
          ...state.streams.slice(action.payload.index + 1),
        ],
      };

    /////////////////////////////////////////////////////
    ///////////////END OF  LIKE STREAM///////////////////
    ////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    ///////////////MANUPULATE UNLIKE STREAM//////////////
    ////////////////////////////////////////////////////
    case UNLIKE_STREAM_REQUEST:
      state.streams[action.payload].loadingLike = true;
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload),
          {
            ...state.streams[action.payload],
            loadingLike: true,
            errorLike: null,
          },
          ...state.streams.slice(action.payload + 1),
        ],
      };
    case UNLIKE_STREAM_SUCCESS:
      const unlike = state.streams.findIndex((stream) => {
        return stream._id === action.payload.data.updatedStream._id;
      });
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, unlike),
          {
            ...(state.streams[unlike] = action.payload.data.updatedStream),
            loadingLike: false,
          },
          ...state.streams.slice(unlike + 1),
        ],
      };
    case UNLIKE_STREAM_FAIL:
      return {
        ...state,
        streams: [
          ...state.streams.slice(0, action.payload.index),
          {
            ...state.streams[action.payload.index],
            loadingLike: false,
            errorLike: action.payload.error,
          },
          ...state.streams.slice(action.payload.index + 1),
        ],
      };
    /////////////////////////////////////////////////////
    ///////////////END OF  UNLIKE STREAM////////////////
    ////////////////////////////////////////////////////

    case STREAM_CREATE_REQUEST:
      return {
        ...state,
        loadingCreateStream: true,
        error: null,
      };
    case STREAM_CREATE_RESET:
      return {
        ...state,
        loadingCreateStream: false,
        errorCreateStream: null,
      };
    case STREAM_CREATE_SUCCESS:
      return {
        ...state,
        streams: [action.payload, ...state.streams],
        loadingCreateStream: false,
        errorCreateStream: null,
      };
    case STREAM_CREATE_FAIL:
      return {
        ...state,
        loadingCreateStream: false,
        errorCreateStream: action.payload,
      };

    case STREAM_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userStreamListReducer = (
  state = {
    streams: [],
    stream: {},
    streamStreamDetails: {},
    streamCreateComment: {},
  },
  action
) => {
  switch (action.type) {
    ////////////////////////////////////////////////////////
    ///////////////CREATE COMMENT///////////////////////////
    ////////////////////////////////////////////////////////
    case USER_CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loadingUSER_Comment: true,
        errorCreateComment: null,
      };
    case USER_CREATE_COMMENT_SUCCESS:
      const a = state.streams.findIndex((stream) => {
        return stream._id === action.payload.updatedStream._id;
      });
      state.streams[a] = action.payload.updatedStream;
      return {
        ...state,
        streams: {
          comments: [action.payload.comments, ...state.streams.comments],
        },
        loadingCreateComment: false,
      };
    case USER_CREATE_COMMENT_RESET:
      return {
        ...state,
        loadingCreateComment: false,
        errorCreateComment: null,
      };
    case USER_CREATE_COMMENT_FAIL:
      return {
        ...state,
        loadingCreateComment: false,
        errorCreateComment: action.payload,
      };
    //////////////////////////////////////////////////////
    ///////////////////END OF COMMENT CREATION
    //////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    ///////////////MANUPULATE STREAM DETAILS////////////////
    ///////////////////////////////////////////////////////
    case USER_STREAM_DETAILS_REQUEST:
      return {
        ...state,
        loadingStreamDetails: true,
        errorStreamDetails: null,
      };
    case USER_STREAM_DETAILS_SUCCESS:
      const ab = state.streams.findIndex((stream) => {
        return stream._id === action.payload;
      });
      return {
        ...state,
        loadingStreamDetails: false,
        streamStreamDetails: state.streams[ab],
      };
    case USER_STREAM_DETAILS_RESET:
      return {
        ...state,
        loadingStreamDetails: false,
        errorStreamDetails: null,
      };
    case USER_STREAM_DETAILS_FAIL:
      return {
        ...state,
        loadingStreamDetails: false,
        errorStreamDetails: action.payload,
      };
    //////////////////////////////////////////////////////
    /////////END OF STREAM DETAILS MANUPULARTION//////////
    //////////////////////////////////////////////////////

    case USER_STREAM_LIST_REQUEST:
      return {
        streams: [],
        loading: true,
        error: null,
      };
    case USER_LIKE_STREAM_REQUEST:
      return {
        ...state,
        loadingLike: true,
        error: null,
      };
    case USER_UNLIKE_STREAM_REQUEST:
      return {
        ...state,
        loadingUnLike: true,
        error: null,
      };

    case USER_STREAM_LIST_SUCCESS:
      return {
        loading: false,
        streams: action.payload.streams,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case USER_STREAM_DELETE_SUCCESS:
      const m = state.streams.findIndex((stream) => {
        return stream._id === action.payload;
      });
      state.streams.splice(m, 1);
      return {
        ...state,
        loading: false,
      };
    case USER_LIKE_STREAM_SUCCESS:
      const i = state.streams.findIndex((stream) => {
        return stream._id === action.payload.updatedStream._id;
      });
      state.streams[i] = action.payload.updatedStream;
      return {
        ...state,
        loadingLike: false,
      };
    case USER_UNLIKE_STREAM_SUCCESS:
      const index = state.streams.findIndex((stream) => {
        return stream._id === action.payload.updatedStream._id;
      });
      state.streams[index] = action.payload.updatedStream;
      return {
        ...state,
        loadingUnLike: false,
      };
    case USER_STREAM_CREATE_REQUEST:
      return {
        ...state,
        loadingCreateStream: true,
        error: null,
      };
    case USER_STREAM_CREATE_RESET:
      return {
        ...state,
        loadingCreateStream: false,
        errorCreateStream: null,
      };
    case USER_STREAM_CREATE_SUCCESS:
      return {
        ...state,
        streams: [action.payload, ...state.streams],
        loadingCreateStream: false,
        errorCreateStream: null,
      };
    case USER_STREAM_CREATE_FAIL:
      return {
        ...state,
        loadingCreateStream: false,
        errorCreateStream: action.payload,
      };

    case USER_STREAM_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
/*
export const streamDetailsReducer = (
  state = { streamStreamDetails: {} },
  action
) => {
  switch (action.type) {
    case STREAM_DETAILS_REQUEST:
      return {
        loadingStreamDetails: true,
        errorStreamDetails: null,
      };
    case STREAM_DETAILS_SUCCESS:
      return {
        loadingStreamDetails: false,
        streamStreamDetails: action.payload,
      };
    case STREAM_DETAILS_RESET:
      return {
        ...state,
        loadingStreamDetails: false,
        errorStreamDetails: null,
      };
    case STREAM_DETAILS_FAIL:
      return {
        loadingStreamDetails: false,
        errorStreamDetails: action.payload,
      };
    default:
      return state;
  }
};


export const streamCreateReducer1 = (state = { stream: {} }, action) => {
  switch (action.type) {
    case STREAM_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case STREAM_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        stream: action.payload,
      };

    case STREAM_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
*/
/*
export const unlikeStreamReducer = (
  state = { streams: [], stream: {} },
  action
) => {
  switch (action.type) {
    case UNLIKE_STREAM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UNLIKE_STREAM_SUCCESS:
      /*
      const index = state.streams.findIndex(
        (stream) => stream.streamId === action.payload.streamId
      );
      state.screams[index] = action.payload;
      
      return {
        ...state,
        loading: false,
      };
    case UNLIKE_STREAM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


  export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PRODUCT_LIST_CLEAR_MESSAGE:
        return {
          loading: false,
          error: null,
        };
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return {
          loading: true,
          ...state,
          error: null,
          success: false,
        };
  
      case PRODUCT_DELETE_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PRODUCT_DELETE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const productCreateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PRODUCT_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          product: action.payload,
        };
      case PRODUCT_CREATE_RESET:
        return {};
      case PRODUCT_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return {
          loading: true,
          error: null,
        };
      case PRODUCT_UPDATE_SUCCESS:
        return {
          loading: false,
          success: true,
          product: action.payload,
        };
      case PRODUCT_UPDATE_RESET:
        return { product: {} };
      case PRODUCT_UPDATE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const productCreateReviewReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REVIEW_REQUEST:
        return {
          loading: true,
          error: null,
        };
      case PRODUCT_CREATE_REVIEW_SUCCESS:
        return {
          loading: false,
          success: true,
        };
      case PRODUCT_CREATE_REVIEW_RESET:
        return {};
      case PRODUCT_CREATE_REVIEW_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const productTopRatedReducer = (state = { product: [] }, action) => {
    switch (action.type) {
      case PRODUCT_TOP_RATED_REQUEST:
        return {
          loading: true,
          error: null,
        };
      case PRODUCT_TOP_RATED_SUCCESS:
        return {
          loading: false,
          products: action.payload,
        };
      case PRODUCT_TOP_RATED_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  */
