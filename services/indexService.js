const path = require('path');

module.exports = {
    async serveIndexPage (req, res) {
        try {
            res.sendFile(path.join(__dirname, '/../view/index.html'));
        } catch (error) {
            console.error("Got this error in serveIndexPage():", error)
            res.send('Oops, it\'s not you. It\'s us.')
        }
    },
}