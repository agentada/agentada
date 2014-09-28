module.exports = {

    attributes: {
        category:'STRING',
        count: 'INTEGER',
        owner: {
            model:'user'
        }
    }
}
