module.exports = {
    configure: (developerToken) => {
        window.MusicKit.configure({
            developerToken,
            app: {
                name: 'Song Sync',
                build: '1978.4.1'
            }
        });
    },
    getInstance: () => window.MusicKit.getInstance()
}