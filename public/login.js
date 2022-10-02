function Login(){

    const ctxUsers = React.useContext(UserContexts); 
  
    const [shows, setShows]         = React.useState((ctxUsers.Logins.length < 1));
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userIndex, setUserIndex] = React.useState(''); 

    const ctx = React.useContext(UserContext);

    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        };
        return true;
    }
  
    function handleLogin(){
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;

      let loggedIn = false;
      let userIndex = 0;

      firebase.auth().signInWithEmailAndPassword(
        email,
        password
      )
      .then((user) => { 

        console.log('Fetching Balance')
        //const url = `/account/balance/${email}`;
        loginMechanics(email)

      })
      .catch((e) => console.log(e.message));

      if (loggedIn){
        setUserIndex(userIndex);
        ctxUsers.Logins.push({Login: userIndex});
        setShows((ctxUsers.Logins.length < 1));
      }
      
      else {
      setStatus("Email and Password combination not found.");
      };
    }    
  
    function clearForm(){
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
      ctxUsers.Logins = [];
      setEmail('');
      setPassword('');
      setShows((ctxUsers.Logins.length < 1));
      document.getElementById("LoginAnchor").textContent = "Login";
    }

    function handleGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      let loggedIn = false;
      firebase.auth().signInWithPopup(provider)
      .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          const user = result.user;
          
          //console.log('Fetching Balance')
          //const url = `/account/balance/${user.email}`;

          //console.log('starting mechanics')
          loginMechanics(user.email)
          //console.log('mechanics finished')


      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          if(errorCode){setStatus("Email and Password combination not found.");}
          
      });
    }

    function loginMechanics(email){

      const url = `/account/balance/${email}`;

      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
        console.log('balance fetched')
        console.log(data[0].balance)
        return data
      })().then((data) => {

      ctxUsers.Logins.push({Email: email, Balance: data[0].balance});
      console.log('Test')
      console.log(ctxUsers.Logins[0])

      const userEmail      = document.getElementById("LoginAnchor");
      userEmail.innerText = email;
      //console.log('Test')
      //console.log(user.email)
      setShows((ctxUsers.Logins.length < 1));
      setStatus(true);})
    };
    
    return (
      <Card
        id = "LoginCard"
        bgcolor="primary"
        header="Login"
        status={status}
        body={shows ? (  
                <>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" disabled={!email || !password} onClick={handleLogin}>Login</button><>       </>
                <button type="submit" className="btn btn-light" id="googlelogin" onClick={handleGoogle}>Google Login</button>
                </>
              ):(
                <>
                <h5>You are logged in!</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Logout</button>
                </>
              )}
      />
    )
  }
  
  