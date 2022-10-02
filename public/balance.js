function Balance(){
  const ctx = React.useContext(UserContext);
  const ctxUsers = React.useContext(UserContexts); 

  if (ctxUsers.Logins.length == 0) {
    return (<>
                <h5>Please Login to view your balance</h5>
                </>
              )}
  else {
    let userLoggedIn = (ctxUsers.Logins[0].Email);
    let totalBalance = `Balance: ${ctxUsers.Logins[0].Balance}`
    return (
      <Card
        bgcolor="primary"
        header="Total Balance"
        //status={status}
        body={(  
                <>{totalBalance}<br/>
                
                </>
              )}
      />
    )
  }
}
