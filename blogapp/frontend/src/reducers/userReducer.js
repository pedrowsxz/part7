import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storage from "../services/storage";

export const loadUserReducer = createAsyncThunk('user/loadUser', async () => {
    const user = storage.loadUser()
    return user
})

export const loginReducer = createAsyncThunk('user/login', async (credentials) => {
    const user = await loginService.login(credentials)
    storage.saveUser(user)
    return user
}) 

export const logoutReducer = createAsyncThunk('user/logout', async () => {
    storage.removeUser()
    return null
})

const userSlice = createSlice({
    name: 'user',
    initialState: {user:null},
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserReducer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload
            })
            .addCase(loadUserReducer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(loginReducer.pending, (state) => {
                state.status = 'loading'; 
            })
            .addCase(loginReducer.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload
            })
            .addCase(loginReducer.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(logoutReducer.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = null
      })

    }
})

/*export const loadUserReducer = () => {
    return async (dispatch) => {
        const user = storage.loadUser()
        if (user) {
            dispatch(setUser(user))
        }
    }
}

export const loginReducer = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials)
        //console.log(user)
        dispatch(setUser(user))
        storage.saveUser(user)
    }
}

export const logoutReducer = () => {
    return async (dispatch) => {
        dispatch(setUser(null))
        storage.removeUser()
    }
}*/


export const { setUser } = userSlice.actions;

export default userSlice.reducer
