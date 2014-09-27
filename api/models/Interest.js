module.exports = {

	adapter: 'mongodbServer',

    attributes: {
        category:'STRING',
        name:'STRING',
        id: 'STRING',
        owner: {
            model:'user'
        }
    }
}
