const func = require('../GetTweets')

test('should return 401 if the user does not pass easyAuth', async () => {
    const context = {
        bindings: {
            res: {}
        },
        done() {}
    }
    const req = {
        headers: { 'x-ms-client-principal-name': null }
    }

    await func(context, req)
    expect(context.bindings.res.status).toBe(401)
})