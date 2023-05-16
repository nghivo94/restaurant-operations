import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../services/login"

const initialState = {
    user : null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        removeUser (state, action) {
            return initialState
        },
        removeError (state, action) {
            return {...state, error: null}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(fetchUser.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { removeUser, removeError } = userSlice.actions

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ username, password, errorTimeout }, { rejectWithValue, dispatch }) => {
        try {
            const user = await loginService.loginFromCredentials({ username: username, password: password} )
            window.localStorage.setItem('loggedInToken', user.token)
            return user
        } catch (error) {
            const message = error.response ? error.response.data.error : error.message
            if (errorTimeout) {
                setTimeout(() => {
                    dispatch(removeError())
                }, errorTimeout)
            }
            throw rejectWithValue(message)
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (obj, { rejectWithValue }) => {
        try {
            const token = window.localStorage.getItem('loggedInToken')
            if (token) {
                const user = await loginService.loginFromToken(token)
                return user
            }
        } catch (error) {
            const message = error.response ? error.response.data.error : error.message
            if (message === 'token expired') {
                window.localStorage.removeItem('loggedInToken')
            }
            throw rejectWithValue(message)
        }
    }
)

export default userSlice.reducer