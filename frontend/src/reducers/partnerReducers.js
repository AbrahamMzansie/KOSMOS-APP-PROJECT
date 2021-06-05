import {CREATE_PARTNER_FAIL , 
    CREATE_PARTNER_RESET ,
     CREATE_PARTNER_FAIL ,
      CREATE_PARTNER_RESET} from "../constants/partnerConstants";
export const getPartnerReducer = (state = { product: [] }, action) => {
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
  