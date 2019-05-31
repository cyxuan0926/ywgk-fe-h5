module.exports = {
    buildCommands: ['npm install', 'npm run build:dev'],
    buildOutputPath: 'dist',
    repository: {
        name: 'prison-h5',
        branch: 'release',
        url: 'https://git.dev.tencent.com/cyxuan0926/prison-h5.git'
    },
    remotePath: '/mnt/projects/tomcat/ywgk/h5',
    sourcePatterns: ['static', 'index.html'],
    server: {
        host: '120.79.251.238',
        port: 22,
        username: 'root',
        password: 'legendEDP02'
    }
}
