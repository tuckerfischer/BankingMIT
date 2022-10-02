function AllData(){
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  
  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">All Data</h5>
        {data}
      </div>
    </div>
  )
}