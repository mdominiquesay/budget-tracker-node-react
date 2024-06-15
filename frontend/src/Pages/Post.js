
async function POSTBudget (route,params,formData) {
    console.log(formData);
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/${route}/${params}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            console.log(formData);
            throw new Error('Failed to submit form');
        }
        
        console.log('Form submitted successfully');
        // You might want to redirect the user or perform other actions upon successful submission
        return response;
    } catch (error) {
        console.log('Error submitting form:', error);
        // Handle error, display error message to the user, etc.
    }
    
}

export default POSTBudget;
