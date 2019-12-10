import React, { Component } from "react";
import swal from 'sweetalert';

class DeleteCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
 this.sweetalertfunction = this.sweetalertfunction.bind(this)
  }
 
  componentDidMount() {
    fetch("/api/company")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json

        }); 
       
      });
     
  }

  filterList = event => {
    console.log("this is a filter!");
    let url = "/api/company/" + event.target.value;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  };

  deleteCompany = (event, myid) => {
    let url = "/api/company/" + myid;
    fetch(url, {
      method: "DELETE",
    
    })
    .then(res => res.json())
    .then( this.props.history.push("/dashboard"))

   /*  .then(json => {
        this.setState({
          isLoaded: true,
         items: json
        });

    }) */
  };

 
 sweetalertfunction = (e, item) =>{
  swal({
    text: `Delete ${item.name} `,
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete ) {
       this.deleteCompany(e, item._id);
      swal(`Company has been deleted `, {
        icon: "success",
      });
    } else {
      swal("It canceled");
    }
  });
  
 }


  render() {
 
    
    var { isLoaded, items } = this.state;
    if (!isLoaded && !items) {
      return <div>is Loading</div>;
    } else {
      return (
        <div className="container " style={{width: "600px", marginTop: "8%"}}>
          <input
          

            className= "form-control focusedInput" id="myInput" 
            type="text"
            placeholder="Search name Here to delete"
            onChange={this.filterList}
            style= {{marginBottom:"8%"}}
          />
          <div >
            {items.map((item) => 
              
              <div key={item._id}>
                <ul
                  className="list-group" id="myList"
                >
                  <li className= "list-group-item list-group-item-danger" >
                    <div className="row">
                        <div className="col-sm-10">
                             <h5>name:{item.name}, email: {item.email}</h5> 
                        </div>
                        <div style={{float:'right'}} >
                    <button className="btn btn-danger" onClick={e => this.sweetalertfunction(e, item)}>
                        Delete
                    </button>
                        </div >
                    </div>
                     
                   
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default DeleteCompany;


