import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        startLoading (state, action) {
            return true
        },
        stopLoading (state, action) {
            return false
        }
    }
})

export const { startLoading, stopLoading } = loadingSlice.actions
export default loadingSlice.reducer