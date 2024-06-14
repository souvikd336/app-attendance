let fetchRes = fetch(
    "http://localhost:4000/api/v1");
        
    // FetchRes is the promise to resolve
    // it by using.then() method
    fetchRes.then(res =>
        res.json()).then(d => {
            console.log(d)
        })