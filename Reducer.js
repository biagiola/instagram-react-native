export const initialState = {
  userName: null,
  userEmail: null,
  newPosts: []
}

// if there is and user's value in the storage
const user = JSON.parse(localStorage.getItem('user'))
const email = JSON.parse(localStorage.getItem('email'))

console.log('reducer user', user)

user ? initialState.userName = user : initialState.userName = null 
email ? initialState.userEmail = email : initialState.userEmail = null 


export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_EMAIL: 'SET_EMAIL',
  SET_NEW_POST: 'SET_NEW_POST'
}

const reducer = (state, action) => {
  
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        userName: action.userName
      }

    case actionTypes.SET_EMAIL:
      return {
        ...state,
        userEmail: action.userEmail
      }

    case actionTypes.SET_NEW_POST:
      return {
        ...state,
        newPosts: action.post
      }

    default:
      return state
  }
}

export default reducer