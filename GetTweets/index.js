module.exports = async function (context, req) {
    const auth_user_name = req.headers['x-ms-client-principal-name']

    if (!auth_user_name) {
        context.bindings.res = {
            status: 401
        }
        context.done()
        return
    }

    const loadedData = context.bindings.tweets
    if (loadedData.length == 0) {
        context.bindings.res = {
            status: 404
        }
        context.done()
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

    context.bindings.res = {
        status: 200,
        body: tweets
    }
    context.done();
}