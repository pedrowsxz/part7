import usersService from '../services/users'
import { createAsyncThunk } from '@reduxjs/toolkit'

const usersReducer = (state=[], action) => {
    switch(action.type){
        case 'SET_USERS':
            return action.payload
        default:
            return state
    }
}

export const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        payload: users
    }
}

export const fetchUsers = () => {
    return async (dispatch) => {
        const response = await usersService.getAllUsers()
        dispatch(setUsers(response)) 
    }
    
}

export default usersReducer