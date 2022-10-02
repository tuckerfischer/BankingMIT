function NavBar(){

  const ctxUsers = React.useContext(UserContexts);  
  if (ctxUsers.Logins.length == 0) {
    const username = 'Login'}
  else {
    let userLoggedIn = (parseInt(ctxUsers.Logins[parseInt(ctxUsers.Logins.length-1)].Login)-1);
    console.log(userLoggedIn);}

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BankersUnited</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" >
            <a className="nav-link" id='createLink' href="#/CreateAccount/" data-toggle="popover" title="Create a New Account">Create Account</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link" id = 'depositLink' href="#/deposit/" data-toggle="popover" title="Deposit your money!">Deposit</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link" id = 'withdrawLink' href="#/withdraw/" data-toggle="popover" title="Withdraw your money!">Withdraw</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link" id = 'balanceLink' href="#/balance/" data-toggle="popover" title="Check your balance">Balance</a>
          </li>
        </ul>
        <ul className="navbar-nav  ml-auto">
          <li className="nav-item">
            <a className="nav-link" id = 'LoginAnchor' href="#/login/" data-toggle="popover" title="Log in to your account">Login</a>
          </li>        
        </ul>
      </div>
    </nav>
    </>
  );
}