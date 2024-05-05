
function GETBudget(route, params,onSuccess) {

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/${route}/${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            onSuccess(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}

export default GETBudget;
