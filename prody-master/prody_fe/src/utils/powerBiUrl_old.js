
const getPowerBiURL = ( company ) => {
    let powerBiUrl = {};
    switch (company) {
        case 'tnuva':
            powerBiUrl = {
                'insights' : 'https://app.powerbi.com/view?r=eyJrIjoiODFkODM2NDAtY2U3Yy00NmM3LWI3YzgtYmZiMjMxODFhZmIzIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'service' : 'https://app.powerbi.com/view?r=eyJrIjoiN2Q1NmNmMDYtOTFiMS00NjIxLWE3YTctNTc3Y2I3MjllZmFkIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'myproducts' : null,
                'advertorials' : null
            };
            break;

        case 'carmit':
            powerBiUrl = {
                'insights' : 'https://app.powerbi.com/view?r=eyJrIjoiOTg4YWQxZmEtZjJhZi00YTdlLWE1MTEtZTRiMTlkMTM5YzJiIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'service' : 'https://app.powerbi.com/view?r=eyJrIjoiOTc4YjU1ZTAtNTViMy00ZWQ3LWEyNzktMTI0MjEwZGE5ZWNhIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'myproducts' : null,
                'advertorials' : null
            };
            break;

        case 'tempo':
            powerBiUrl = {
                'insights' : 'https://app.powerbi.com/view?r=eyJrIjoiZWFmYzE2ZmYtNzVlYy00NmM3LTliMzgtYjllNjJkOGZiZDI1IiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'service' :  'https://app.powerbi.com/view?r=eyJrIjoiODUzOGFiZTgtZDU5NC00Mjg4LWE4YjUtZjk2NzAxNDk5OTQ5IiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'myproducts' : 'https://app.powerbi.com/view?r=eyJrIjoiM2Y1MDZmM2ItZDcxZC00ZDFiLWFlOTItNTFjNjQwMDEzZmI4IiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'advertorials' : 'https://app.powerbi.com/view?r=eyJrIjoiOGZmNmIxMDEtZDAyNS00YjBhLTlmODUtYjNiOTkwYThlN2Q2IiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9'
            };
            break;

        case 'unilever':
            powerBiUrl = {
            'insights' : 'https://app.powerbi.com/view?r=eyJrIjoiOGRjYzVmNGUtNjNlMC00MzFhLTgzNDctYmQ5ZjA0NzM2MzA1IiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
            'service' : 'https://app.powerbi.com/view?r=eyJrIjoiMTFmNzk4YmYtMGViZi00YzZjLThhNTktZGU3MDYyOWZkNzY3IiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
            'myproducts' : 'https://app.powerbi.com/view?r=eyJrIjoiNDNjZmQwNDgtYmJiMC00NTRjLTk1MGQtOTVmYWMyZGFjNDFlIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
            'advertorials' : 'https://app.powerbi.com/view?r=eyJrIjoiYzFjMjI4YjMtN2QzMy00MjIxLWIxNWItNjc0MjJlYjQ1YWVkIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9'
            };
            break;

        default:
            powerBiUrl = {};
    }
    return powerBiUrl;
};

export default getPowerBiURL




