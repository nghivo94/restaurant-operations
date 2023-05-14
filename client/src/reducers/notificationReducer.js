import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {},
    reducers: {
        createNotification (state, action) {
            return action.payload
        },
        removeNotification (state, action) {
            return {}
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, isError, timeout) => {
    return dispatch => {
        dispatch(createNotification({ message: message, isError: isError }))
        setTimeout(() => { dispatch(removeNotification()) }, timeout)
    }
}

export default notificationSlice.reducer