module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    setupFiles: ['dotenv/config'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};

