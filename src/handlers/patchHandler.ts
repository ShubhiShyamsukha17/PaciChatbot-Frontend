import axios from 'axios';

const patchHandler = async (
    URL: string,
    formData: object,
    type: string = 'application/json'
) => {
    const headers = {
        'Content-Type': type,
        Authorization: '',
    };
    const response: any = {
        status: 0,
        data: {},
        statusCode: 500,
    };

    await axios
        .patch(URL, formData, { headers })
        .then((res) => {
            response.status = 1;
            response.data = res.data;
            response.statusCode = res.status;
        })
        .catch((err) => {
            response.status = 0;
            response.data = err.response.data;
            response.statusCode = err.response.status;
        });
    return response;
};

export default patchHandler;
