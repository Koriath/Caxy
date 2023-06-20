import React from "react";

class LoginPanel extends React.Component{

  loginUser = (e) => {
    // Prevent refreshing page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const data = new URLSearchParams();

    for (const pair of formData) {data.append(pair[0], pair[1]);}
    fetch('/login/user', { method: 'POST', body: data})
    .then(response => response.json())
    .then(data => {
      console.log("Login level: +"+data.session_level);
      this.props.sessionLevel(data.session_level);
    })
    .then(data =>{
      if(this.props.sessionLevel == 0){return;}

      fetch('/stock', { method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log("Refreshing stock:");
        console.log(data.products);
        console.log(data.categories);
        this.props.products(data.products);
        this.props.categories(data.categories);
      });

    });



  }


  render() {
    return (
      <form onSubmit={this.loginUser}>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="new-password"
        />
      </form>
    );
  }


}

export default LoginPanel;
