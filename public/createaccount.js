function CreateAccount(){
  const ctxUsers = React.useContext(UserContexts); 

  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);


  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (label === 'password' && field.length < 8)
      {
        setStatus('Error: ' + 'Password must be greater than 8 characters long');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    const newBalance = 100
    const url = `/account/balance_data/${email}/${newBalance}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
    
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
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
        check_user(user.email)
        //console.log('starting mechanics')
        
        //console.log('mechanics finished')


    })
  }


  function check_user(email){
    const url = `/account/balance/${email}`;

    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      //console.log(data);
      //console.log('balance fetched')
      console.log(data[0].balance)
    })().then(
      loginMechanics(email)
      ).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      const newBalance = 100
      const url = `/account/balance_data/${email}/${newBalance}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
        setShow(false);
        ctxUsers.Logins.push({Email: email, Balance: newBalance});
        console.log('Test')
        console.log(ctxUsers.Logins[0])

        const userEmail      = document.getElementById("LoginAnchor");
        userEmail.innerText = email;
      })
      ();})


    }

    function loginMechanics(email){
      const url = `/account/balance/${email}`;
  
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        //console.log(data);
        //console.log('balance fetched')
        //console.log(data[0].balance)
        return data
      })().then((data) => {
  
      ctxUsers.Logins.push({Email: email, Balance: data[0].balance});
      console.log('Test')
      console.log(ctxUsers.Logins[0])
  
      const userEmail      = document.getElementById("LoginAnchor");
      userEmail.innerText = email;
      //console.log('Test')
      //console.log(user.email)
      setShow((ctxUsers.Logins.length < 1));
      setStatus(true);})
    };
    

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" disabled={!name || !email || !password} onClick={handleCreate}>Create Account</button><>       </>
              <button type="submit" className="btn btn-light" id="googlelogin" onClick={handleGoogle}>Google Login</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}