import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialState {
    AddGameCoin: {
        loading: 'idle' | 'pending' | 'succeeded' | 'failed',
        response: {
            message: string | null
        }
    },
}

const initialState: initialState = {
    AddGameCoin: {
        loading: 'idle',
        response: {
            message: null
        }
    },

}

export const AddGameCoinAction = createAsyncThunk(
    'user/addgamecoin',
    async (add: { userid: number | null, amount: number }) => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/user/addgamecoin`, {
            method: 'POST',
            body: JSON.stringify(add),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(async (res) => {
            if (res.ok) {
                return res.json()
            } else {
                const text = await res.text()
                throw new Error(text)
            }
        })
    }
)

export const userActionsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //join attempt thunk
        builder.addCase(AddGameCoinAction.pending, (state, action) => {
            state.AddGameCoin.loading = 'idle'
        }),
            builder.addCase(AddGameCoinAction.fulfilled, (state, action) => {
                state.AddGameCoin.loading = 'succeeded'
                state.AddGameCoin.response = action.payload
            }),
            builder.addCase(AddGameCoinAction.rejected, (state, action) => {
                state.AddGameCoin.loading = 'failed'
                state.AddGameCoin.response = JSON.parse(action.error.message as string)
            })
    }
})


export default userActionsSlice.reducer
