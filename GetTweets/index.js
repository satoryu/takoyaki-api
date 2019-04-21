module.exports = async function ({ bindings, done }, req) {
    const auth_user_name = req.headers['x-ms-client-principal-name']

    if (!auth_user_name) {
        bindings.res = {
            status: 401
        }
        done()
        return
    }

    const loadedData = bindings.tweets
    if (loadedData.length == 0) {
        bindings.res = {
            status: 404
        }
        done()
        return
    }

    const tweets = loadedData.map((data) => {
        return {
            id: data.Id,
            text: data.Text,
            name: data.PartitionKey,
            created_at: new Date(data.CreatedAt)
        }
    })

    bindings.res = {
        status: 200,
        body: tweets
    }
    done();
}