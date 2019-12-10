import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanies } from '../../actions/index'

const DeleteCompany = ({getCompanies, company:{companies, loading}}) =>  {
    useEffect(() => {
        getCompanies()
    }, [getCompanies])
    return (
        <div className="container " style={{width: "600px", marginTop: "8%"}}>
          <input
          

            className= "form-control focusedInput" id="myInput" 
            type="text"
            placeholder="Search name Here"
         
            style= {{marginBottom:"2%"}}
          />
          <div >
            {companies.map(item => (
              <div key={item._id}>
                <ul
                  className="list-group" id="myList"
                >
                  <li className= "list-group-item list-group-item-secondary" >
                    
                      <h5>{item.name} || {item.email} </h5> 
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    }

DeleteCompany.propTypes = {
     getCompanies: PropTypes.func.isRequired,
     company: PropTypes.object.isRequired
}

const mapStateToProps=state =>({
    company: state.company
})

export default connect(mapStateToProps, {getCompanies})(DeleteCompany)