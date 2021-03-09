
const getPowerBiURL = ( language ) => {
    let powerBiUrl = {};
    switch (language) {
        case 'ENG':
            powerBiUrl = {
                'market' : 'https://app.powerbi.com/view?r=eyJrIjoiMWNmZjY3ZjQtMjVjMy00MjE1LWE1MjEtN2M2N2ZkYTBiMDgyIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'ingredients' : 'https://app.powerbi.com/view?r=eyJrIjoiNDUwNDk0ZGUtYzE1Ni00MjY4LWE5MTUtYjQ0Mjk3OWU0YzEzIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'nutrition' : 'https://app.powerbi.com/view?r=eyJrIjoiMzVkNDliMTgtOTM4OC00ZDk1LWJjY2EtYzgyNGE1YzBmNjJiIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9'
            };
            break;

        case 'HEB':
            powerBiUrl = {
                'market' : 'https://app.powerbi.com/view?r=eyJrIjoiMzFmZmMxZWUtNWE4Ny00NWU0LWE3YjMtNTRlNDQ2YmY5YzllIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'ingredients' : 'https://app.powerbi.com/view?r=eyJrIjoiYjkyZTRhMWYtODViYy00MDU0LWFkMDctMzFlNGRkZDE3NGExIiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9',
                'nutrition' : 'https://app.powerbi.com/view?r=eyJrIjoiMGEyNzcyMzYtOGQwZC00ZjUxLWEyZmYtYTc1ZmRkNmVlNzQ1IiwidCI6IjE5MDIwMjcxLTQ3YzYtNGFkZS05M2M4LWZiZTk2NGRhZmFhMCIsImMiOjl9'
            };
            break;

        default:
            powerBiUrl = {};
    }
    return powerBiUrl;
};

export default getPowerBiURL




