
function Get(route, params,onSuccess) {

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/${route}/${params}`)
        .then((response) => response.json())
        .then(result => {
            onSuccess(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}

export default Get;
