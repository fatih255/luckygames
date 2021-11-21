
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


interface adminState {
    updateLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
    deleteLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
    createLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
    updateStatusLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
    responsemessage: string | null
    error: string | undefined | null
    gameroom: {
        user_total: number | null | undefined,
        participation_fee: number | null | undefined,
        label: string | null | undefined
    }
}

// Define the initial state using that type
const initialState: adminState = {
    updateLoading: 'idle',
    deleteLoading: 'idle',
    createLoading: 'idle',
    updateStatusLoading: 'idle',
    error: undefined,
    gameroom: { user_total: null, participation_fee: null, label: null },
    responsemessage: null
}

//async state update 
export const addGameRoom = createAsyncThunk(
    'admin/addroom',
    // if you type your function argument here
    async (room: object) => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/admin/add-game`, {
            method: 'POST',
            body: JSON.stringify(room),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return { message: 'Sunucu Bağlanırken Hata Bir Oluştu' }
            }
        }).catch(err => {
            throw { message: 'Sunucu Bağlanırken Hata Bir Oluştu' }
        })

    }
)

//async state update 
export const UpdateGameRoom = createAsyncThunk(
    'admin/update-gameroom',
    // if you type your function argument here
    async (room: object) => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/admin/update-gameroom`, {
            method: 'POST',
            body: JSON.stringify(room),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return { message: 'Sunucu Bağlanırken Hata Bir Oluştu' }
            }
        }).catch(err => {
            throw { message: 'Sunucu Bağlanırken Hata Bir Oluştu' }
        })

    }
)

//async state update 
export const deleteGameRoom = createAsyncThunk(
    'admin/delete-gameroom',
    // if you type your function argument here
    async (id: number) => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/admin/delete-gameroom/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return { message: 'Sunucu Bağlanırken Hata Bir Oluştu' }
            }
        }).catch(err => {
            throw { message: 'Sunucu Bağlanırken Hata Bir Oluştu' }
        })

    }
)


//async state update 
export const updateGameRoomStatus = createAsyncThunk(
    'admin/update-gameroom-status',
    // if you type your function argument here
    async (room: object) => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/admin/update-gameroom-status`, {
            method: 'POST',
            body: JSON.stringify(room),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw res.json()
            }
        }).catch(err => {
            throw { message: err.message }
        })

    }
)


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetLoadings: (state) => {
            state.updateLoading = initialState.updateLoading
            state.deleteLoading = initialState.deleteLoading
            state.createLoading = initialState.createLoading
            state.updateStatusLoading = initialState.updateStatusLoading
        }
    },
    extraReducers: (builder) => {
        //addgameroom thunk
        builder.addCase(addGameRoom.pending, (state, action) => {
            state.createLoading = 'pending'
            state.responsemessage = null
        }),
            builder.addCase(addGameRoom.fulfilled, (state, action) => {
                state.createLoading = 'succeeded'
                state.error = undefined
                state.responsemessage = action.payload.message
            }),
            builder.addCase(addGameRoom.rejected, (state, action) => {
                state.createLoading = 'failed'
                state.error = action.error.message
            }),
            //updategameroom thunk
            builder.addCase(UpdateGameRoom.pending, (state, action) => {
                state.updateLoading = 'pending'
            }),
            builder.addCase(UpdateGameRoom.fulfilled, (state, action) => {
                state.updateLoading = 'succeeded'
                state.error = undefined
                state.responsemessage = action.payload.message
            }),
            builder.addCase(UpdateGameRoom.rejected, (state, action) => {
                state.updateLoading = 'failed'
                state.error = action.error.message
            }),
            //deletegameroom thunk
            builder.addCase(deleteGameRoom.pending, (state, action) => {
                state.deleteLoading = 'pending'
            }),
            builder.addCase(deleteGameRoom.fulfilled, (state, action) => {
                state.deleteLoading = 'succeeded'
                state.error = undefined
                state.responsemessage = action.payload.message
            }),
            builder.addCase(deleteGameRoom.rejected, (state, action) => {
                state.deleteLoading = 'failed'
                state.error = action.error.message
            }),
            //updategameroomstatus thunk
            builder.addCase(updateGameRoomStatus.pending, (state, action) => {
                state.updateStatusLoading = 'pending'
            }),
            builder.addCase(updateGameRoomStatus.fulfilled, (state, action) => {
                state.updateStatusLoading = 'succeeded'
                state.error = undefined
                state.responsemessage = action.payload.message
            }),
            builder.addCase(updateGameRoomStatus.rejected, (state, action) => {
                state.updateStatusLoading = 'failed'
                state.error = action.error.message
            })


    }

})

export const {
    resetLoadings
} = adminSlice.actions



export default adminSlice.reducer