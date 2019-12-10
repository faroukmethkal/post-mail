import React, { Component } from "react";
import swal from 'sweetalert';

class SearchBar extends Component {
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

  sendEmail = (event, myid) => {
    let url = "/api/company/" + myid;
    console.log("sending email: " + myid);
    fetch(url, {
      method: "POST",
      body: "yoo"
    });
  };

 
 sweetalertfunction(e, item){
  swal({
    text: `Send email til ${item.name} `,
    buttons: true,
    dangerMode: false,
  })
  .then((willDelete) => {
    if (willDelete) {
       this.sendEmail(e, item._id);
      swal(`Emailen er nu sendt afsted til ${item.name}`, {
        icon: "success",
      });
    } else {
      swal("Emailen blev ikke sendt");
    }
  });
  
 }


  render() {
 
    
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>is Loading</div>;
    } else {
      return (
        <div className="container " style={{width: "600px", marginTop: "8%"}}>
          <input
          

            className= "form-control focusedInput" id="myInput" 
            type="text"
            placeholder="Search name Here"
            onChange={this.filterList}
            style= {{marginBottom:"2%"}}
          />
          <div >
            {items.map(item => (
              <div key={item._id}>
                <ul
                  className="list-group" id="myList"
                >
                  <li className= "list-group-item list-group-item-secondary" >
                    
                    <a href="#!"
                      onClick={e => this.sweetalertfunction(e, item)}
                     
                    >
                      <h5>{item.name} </h5> 
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default SearchBar;


