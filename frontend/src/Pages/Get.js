
function Get(route, params,onSuccess,onError) {

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/${route}/${params}`)
        .then((response) => response.json())
        .then(result => {
            onSuccess(result);
        })
        .catch(error => {
            onError(error);
        });

}

export default Get;
