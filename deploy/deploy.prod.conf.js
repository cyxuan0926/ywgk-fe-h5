module.exports = {
    buildCommands: ['npm install', 'npm run build:prod'],
    buildOutputPath: 'dist',
    repository: {
        name: 'prison-h5',
        branch: 'master',
        url: 'https://git.dev.tencent.com/cyxuan0926/prison-h5.git'
    },
    remotePath: '/mnt/projects/tomcat/ywgk/h5',
    sourcePatterns: ['static', 'index.html'],
    server: {
        host: '39.108.185.51',
        port: 22,
        username: 'root',
        password: 'Nihaoccj123'
    }
}
