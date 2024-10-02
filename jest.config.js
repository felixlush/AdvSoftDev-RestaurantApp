module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
};
module.exports = {
    setupFiles: ['./jest.setup.js'],
    preset: 'ts-jest',
    testEnvironment: 'node',
};
