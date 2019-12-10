import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isLoaded: false,
    }
  }

  componentDidMount(){
      fetch('/api/company')
      .then(res => res.json())
      .then(json => {
          this.setState({
              isLoaded: true,
              items: json,
          })
      })
  }

  filterList = (event) => {
    console.log("this is a filter!");
    let url = '/api/company/' + event.target.value 
    fetch(url)
      .then(res => res.json())
      .then(json => {
          this.setState({
              isLoaded: true,
              items: json,
          })
      })
  };

  sendEmail = (event, myid) => {
    let url = "/api/company/" + myid;
    console.log("sending email: " + myid);
    fetch(url, {
      method: "POST",
      body: "yooooo"
    });
  }

  render() {
      var {isLoaded, items} = this.state;
      if (!isLoaded){
          return <div>is Loading</div>;
      }else {
           return (
            <div style={{ textAlign: 'center', marginTop:'4em' }}>

              <form className = 'brand-logo center'>
                <input type="text" placeholder="Search name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ½  e Here" onChange={this.filterList} />
              </form>

                  <div className="collection with-header">
                    {items.map(item => (
                      <div key={item._id}>
                        <div className = 'collection-header' onClick={ (e) => this.sendEmail(e, item._id)}>
                          <div className="avatar">Name: {item.name} | Email: {item.email} </div> 
                        </div>
                      </div>
                    ))}
                  </div>
            
            </div>
    );
      
  }
 
  }
}

export default SearchBar;
