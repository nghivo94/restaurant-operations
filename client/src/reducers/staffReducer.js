import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import staffService from "../services/staff"

const initialState = {
    staffAccounts: [],
    staffAccount: null,
    isLoading: false,
    error: null
}

const staffSlice = createSlice({
    name: 'staff',
    initialState: initialState,
    reducers: {
        removeData (state, action) {
            return initialState
        },
        removeError (state, action) {
            return {...state, error: null}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStaffAccount.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getStaffAccount.fulfilled, (state, action) => {
            state.isLoading = false
            state.staffAccount = action.payload
        })
        builder.addCase(getStaffAccount.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }  
})

export const { removeStaff, removeError } = staffSlice.actions

export const getStaffAccount = createAsyncThunk(
    'staff/account',
    async ({ token, username, errorTimeout }, { rejectWithValue, dispatch }) => {
        try {
            const staff = await staffService.getStaffAccount(token, username)
            return staff
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

export default staffSlice.reducer