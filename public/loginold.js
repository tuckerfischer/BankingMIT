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
    console.log(email,password);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    let loggedIn = false;
    let userIndex = 0;
    ctx.users.forEach((user) => {
      if(user.email == email && user.password == password);
        {setName(user.name);
          setEmail(user.email);
        loggedIn = true;
        };
      userIndex += 1;
      });
    if (loggedIn){
      setUserIndex(userIndex);
      ctxUsers.Logins.push({Login: userIndex});
      setShows((ctxUsers.Logins.length < 1));
      document.getElementById("LoginAnchor").textContent = email;
    }
    
    else {
    setStatus("Email and Password combination not found.");
    };
    //console.log(show);
  }    

  function clearForm(){
    ctxUsers.Logins = [];
    setEmail('');
    setPassword('');
    setShows((ctxUsers.Logins.length < 1));
    document.getElementById("LoginAnchor").textContent = "Login";
  }
  
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
              <button type="submit" className="btn btn-light" disabled={!email || !password} onClick={handleLogin}>Login</button>
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

