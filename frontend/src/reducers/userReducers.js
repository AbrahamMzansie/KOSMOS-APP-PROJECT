import {
  LIKE_STREAM_REQUEST,
  LIKE_STREAM_SUCCESS,
  UNLIKE_STREAM_SUCCESS,
} from "../constants/streamConstants";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_START,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_START,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_START,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_START,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_START,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_START,
  USER_DELETE_SUCCESS,
  USER_DELETE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_START,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_CONNECT_REQUEST,
  USER_CONNECT_SUCCESS,
  USER_CONNECT_RESET,
  USER_CONNECT_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        userInfo: null,
        loading: true,
        error: null,
      };
    case USER_LOGIN_START:
      return {
        loading: false,
        error: null,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case USER_REGISTER_START:
      return {
        loading: false,
        error: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_DETAILS_START:
      return {
        loading: false,
        error: null,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_DETAILS_RESET:
      return {
        user: {},
      };
    case LIKE_STREAM_SUCCESS:
      const { data } = action.payload;
      const updateUser = {
        userHandler: data.updatedUser.nameHandler,
        streamId: data.updatedStream._id,
      };
      return {
        ...state,
        user: {
          likes: [...state.user.likes, updateUser],
        },
      };
    case UNLIKE_STREAM_SUCCESS:
      return {
        ...state,
        user: {
          likes: state.user.likes.filter(
            (like) => like.streamId !== action.payload.data.updatedStream._id
          ),
        },
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case USER_UPDATE_PROFILE_START:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        success: true,
        loading: false,
        userInfo: action.payload,
      };

    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case USER_LIST_START:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case USER_LIST_RESET:
      return {
        user: [],
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case USER_DELETE_START:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case USER_DELETE_RESET:
      return {
        user: [],
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const updateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case USER_UPDATE_START:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const connectWithAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_CONNECT_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case USER_CONNECT_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_CONNECT_RESET:
      return { user: {} };
    case USER_CONNECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
