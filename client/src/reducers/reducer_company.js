import { GET_COMPANY } from '../actions/index'

const initialState = {
    companies:[],
    company:null,
    loading:true
}

export default function(state = initialState, action){
    const {type, payload } = action;
    switch(type){
        case GET_COMPANY:
            return {
                ...state,
                companies:payload,
                loading:false
            }

        default: 
        return state
    }
}