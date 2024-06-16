async function POST(route, params, formData, onSuccess= undefined, onError = undefined) {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/${route}/${params}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        console.log('Form submitted successfully');
        // Call onSuccess callback if provided
        if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
        }

        return response;
    } catch (error) {
        console.error('Error submitting form:', error);
        // Call onError callback if provided
        if (onError && typeof onError === 'function') {
            onError(error);
        }
    }
}

export default POST;
