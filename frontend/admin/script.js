function logout(){

    url = "http://localhost:4000/api/v1/logout"
    axios.get(url).then(function (response) {
          
          console.log(response);
          const data = document.querySelector('h3');
          data.innerHTML = response.data.message;
          
          // do whatever you want if console is [object object] then stringify the response
          setTimeout(myURL, 5000);
          const message = document.querySelector('p');
          message.innerHTML = `The page will load after delay of 5 seconds using setTimeout()  method.`
      })
  }
  function myURL() {
           window.open('login.html', name = self);
        }