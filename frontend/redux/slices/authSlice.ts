
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'


interface userState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    checkloading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | undefined
    user: {
        id: number | null,
        email: string | null,
        phone: string | null,
        balance: number | null,
        role: string | null
    }
}

// Define the initial state using that type
const initialState: userState = {
    loading: 'idle',
    checkloading: 'idle',
    error: undefined,
    user: { id: null, email: null, phone: null, balance: null, role: null },
}

//async state update 
export const signUp = createAsyncThunk(
    'auth/signup',
    // if you type your function argument here
    async (user: object) => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(res => res.json())
            .catch(error => { throw error.response.message })
    }
)

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (user: object) => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/auth/signin`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(async (response) => {
            if (response.ok) {
                return response.json()
            } else {
                const text = await response.text()
                throw new Error(text)
            }
        })

    }
)

export const Check = createAsyncThunk(
    'auth/check',
    async () => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/auth/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(async (response) => {
            if (response.ok) {
                return response.json()
            } else {
                const text = await response.text()
                throw new Error(text)
            }
        })

    }
)


//logout User
export const Logout = createAsyncThunk(
    'auth/Logout',
    async () => {
        return fetch(`${process.env.SERVER_BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(async (response) => {
            if (response.ok) {
                return true
            } else {
                const text = await response.text()
                throw new Error(text)
            }
        })

    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //sign up thunk
        builder.addCase(signUp.pending, (state, action) => {
            state.loading = 'pending'
        }),
            builder.addCase(signUp.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.error = undefined
            }),
            builder.addCase(signUp.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message
            }),
            //login thunk
            builder.addCase(signIn.pending, (state, action) => {
                state.loading = 'pending'
            }),
            builder.addCase(signIn.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.error = undefined
                state.user = action.payload.user //get user info and jwt token

            }),
            builder.addCase(signIn.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message
            }),
            //check thunk
            builder.addCase(Check.pending, (state, action) => {
                state.checkloading = 'pending'
            }),
            builder.addCase(Check.fulfilled, (state, action) => {
                state.checkloading = 'succeeded'
                state.user = action.payload

            }),
            builder.addCase(Check.rejected, (state, action) => {
                state.checkloading = 'failed'
                state.user = { id: null, email: null, phone: null, balance: null, role: null }
            }),
            //Logout Thunk
            builder.addCase(Logout.pending, (state, action) => {
                state.loading = 'pending'
            }),
            builder.addCase(Logout.fulfilled, (state, action) => {
                state.loading = initialState.loading
                state.checkloading = initialState.checkloading
                state.error = initialState.error
                state.user = initialState.user

            }),
            builder.addCase(Logout.rejected, (state, action) => {
                state.loading = 'failed'
            })
    }
})



export default authSlice.reducer