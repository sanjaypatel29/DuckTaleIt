import { ADD_STUDENT_FAILURE, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, EDIT_STUDENT_FAILURE, EDIT_STUDENT_REQUEST, EDIT_STUDENT_SUCCESS, DELETE_STUDENT_FAILURE, DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, HANDLE_STATE } from "./actionType"

export const initialState = {
    err: "",
    data: [],
    isEdit: false,
    isDelete: false,
    isAdd: false,
    count: 0,
    totalPages: 0,
    page: 1,
    limit: 5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT_REQUEST:
            return {
                ...state
            };

        case ADD_STUDENT_SUCCESS:
            return {
                ...state,
                isAdd: true
            };

        case ADD_STUDENT_FAILURE:
            return {
                ...state,
                err: ""
            };

        case EDIT_STUDENT_REQUEST:
            return {
                ...state
            }
        case EDIT_STUDENT_SUCCESS:
            return {
                ...state,
                isEdit: true
            }
        case EDIT_STUDENT_FAILURE:
            return {
                ...state,
                err: action.payload
            }
        case DELETE_STUDENT_REQUEST:
            return {
                ...state
            }
        case DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                isDelete: true
            }
        case DELETE_STUDENT_FAILURE:
            return {
                ...state,
                err: action.payload
            }
        case HANDLE_STATE:
            return {
                ...state,
                isAdd: false,
                isDelete: false,
                isEdit: false
            }
        default:
            return state;
    }
};

export default reducer