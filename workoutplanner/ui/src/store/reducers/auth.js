import React from 'react';

const initialState = {
    authMessage: [],
    currentUser: {
        token: null,
        email: '',
        user: '',
        expires: '',
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('AUTH_SUCCESS'): {
            const data = action.data
            return {
                ...state, 
                currentUser : {
                    email: data.email,
                    user: data.user || data.username,
                    token: data.token,
                    expires: data.expires,
                },
                authMessage: [data.message]
            }
        }
        case ('AUTH_FAILURE'): {
            return {
                ...state, authMessage: action.data,
            }
        }
        case ('LOGOUT'): {
            return {
                ...state, 
                authMessage: [], 
                currentUser: {
                    token: null,
                    email: '',
                    user: '',
                    expires: '',
                },
            }
        }
        default: return state
    }
}

export default reducer
