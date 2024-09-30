export default async function dataUploader(url, method, body, head) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                ...head
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorData = await response.json();
            return errorData;
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}
