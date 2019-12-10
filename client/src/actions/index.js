import axios from 'axios'


export const ADD_COMPANY='add_company'
export const GET_COMPANY = "GET_COMPANY"


export const addCompany = (values, callback) =>{
    const request = axios.post('/api/company', values)
    .then(() =>callback())
    return {
        type: ADD_COMPANY,
        payload:request

    }
}
//fetch companies

export const getCompanies = () =>async dispatch => {
   try {
       const res = await axios.get('/api/company')

       dispatch({
           type:GET_COMPANY,
           payload: res.data
       })
   } catch (err) {
       console.log('error');
       
   } 
}