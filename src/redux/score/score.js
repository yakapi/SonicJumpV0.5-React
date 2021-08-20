const INITIAL_STATE = {
  score: 10,
  best_score: 10
}

function scoreReducers(state = INITIAL_STATE, action){
  switch (action.type) {
    case "SCORE": {
      return{
        ...state,
        score: action.payload
      }
    }
    case "BESTSCORE": {
      return{
        ...state,
        best_score: action.payload
      }
    }

  }
  return state
}

export default scoreReducers
