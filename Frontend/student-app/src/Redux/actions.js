import { ADD_STUDENT_FAILURE, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, EDIT_STUDENT_FAILURE, EDIT_STUDENT_REQUEST, EDIT_STUDENT_SUCCESS, DELETE_STUDENT_FAILURE, DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, HANDLE_STATE } from "./actionType"
import axios from "axios"

// TO ADD STUDENTS

export const addStudentRequest = () => ({
    type: ADD_STUDENT_REQUEST
})

export const addStudentSuccess = (payload) => ({
    type: ADD_STUDENT_SUCCESS,
    payload
})

export const addStudentFailure = (payload) => ({
    type: ADD_STUDENT_FAILURE,
    payload
})

export const addStudent = (payload) => (dispatch) => {
    dispatch(addStudentRequest())
    axios
        .post("http://localhost:5000/api/student", payload)
        .then(() => dispatch(addStudentSuccess()))
        .catch(err => dispatch(addStudentFailure(err)))
}

// TO EDIT Student

export const editStudentRequest = () => ({
    type: EDIT_STUDENT_REQUEST
})

export const editStudentSuccess = () => ({
    type: EDIT_STUDENT_SUCCESS
})

export const editStudentFailure = (payload) => ({
    type: EDIT_STUDENT_FAILURE,
    payload
})

export const editStudent = ({ payload }) => (dispatch) => {
    dispatch(editStudentRequest())
    axios
        .post(`http://localhost:5000/student/edit/${payload._id}`, payload)
        .then(() => dispatch(editStudentSuccess()))
        .catch(err => dispatch(editStudentFailure(err)))
}

//TO DELETE Student

export const deleteStudentRequest = () => ({
    type: DELETE_STUDENT_REQUEST
})

export const deleteStudentSuccess = () => ({
    type: DELETE_STUDENT_SUCCESS
})

export const deleteStudentFailure = (payload) => ({
    type: DELETE_STUDENT_FAILURE,
    payload
})

export const deleteStudent = ({ id }) => (dispatch) => {
    dispatch(deleteStudentRequest())
    axios
        .delete(`http://localhost:5000/Student/delete/${id}`)
        .then(() => dispatch(deleteStudentSuccess()))
        .catch(err => dispatch(deleteStudentFailure(err)))
}

//to handle State

export const handleState = () => ({
    type: HANDLE_STATE
})