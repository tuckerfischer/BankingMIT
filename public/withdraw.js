function Withdraw(){
  const ctx = React.useContext(UserContext);  
  const ctxUsers = React.useContext(UserContexts);  
  const userEmail      = document.getElementById("LoginAnchor");

  if (ctxUsers.Logins.length == 0) {
    return (<>
                <h5>Please Login to make a withdrawl</h5>
                </>
              )}
  else {
    let userLoggedIn = (parseInt(ctxUsers.Logins[parseInt(ctxUsers.Logins.length-1)].Login)-1);
    //console.log(userLoggedIn);
    //console.log(ctx.users[userLoggedIn].balance);
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [balance, setBalance] = React.useState(ctxUsers.Logins[0].Balance);
    const [withdraw, setWithdraw]         = React.useState('');
    
    const email = ctxUsers.Logins[0].Email

    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        //console.log(!Number(field))
        if (field > balance || !Number(field)) {
          setStatus('Error: Overdraft');
          setTimeout(() => setStatus(''),3000);
          //console.log(typeof field);
          //console.log(field);
          return false;
        }
        return true;
    }

    function handleWithdraw(){
      //console.log(withdraw);
      //console.log(balance);
      //console.log(parseInt(balance) - parseInt(withdraw))
      if (!validate(parseInt(withdraw), 'withdraw')) return;
      setBalance(parseInt(balance) - parseInt(withdraw));
      withdrawMechanics(email, parseInt(balance) - parseInt(withdraw))
    }    


    function withdrawMechanics(email, balance) {
      const url = `/account/balance_data/${email}/${balance}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        //console.log(data);
      })().then((data) => {
        ctxUsers.Logins[0].Balance = balance; 
        console.log('Withdrawn');
      });
      //console.log(balance);
      setShow(false);
    }

    function clearForm(){
      setWithdraw('');
      setShow(true);
    }

    return (
      <Card
        bgcolor="primary"
        header="Withdraw Cash"
        status={status}
        body={show ? (  
                <>Withdraw<br/>
                <input type="input" className="form-control" id="withdraw" placeholder="Enter Withdrawl Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" disabled={!withdraw} onClick={handleWithdraw}>Withdraw</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Make another withdrawl</button>
                </>
              )}
      />
    )
  }
}
