import * as Updates from 'expo-updates';

const productionUrl = 'https://easy-invoice-prod.herokuapp.com';
const stagingUrl = 'https://easy-invoice-api.herokuapp.com';
const localUrl = 'http://localhost:3000';

interface Environment {
    apiUrl: string;
}

const ENV = {
    dev: {
        apiUrl: localUrl,
    },
    staging: {
        apiUrl: stagingUrl,
    },
    prod: {
        apiUrl: productionUrl,
    },
};

function getEnvVars(env = ''): Environment {
    if (env.indexOf('dev') !== -1) return ENV.dev;
    if (env.indexOf('staging') !== -1) return ENV.staging;
    if (env.indexOf('prod') !== -1) return ENV.prod;

    return ENV.staging;
}

export default getEnvVars(Updates.releaseChannel);
