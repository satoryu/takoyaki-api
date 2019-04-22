const func = require('../GetTweets')

describe('GetTweets', () => {
    it('should return 401 if the user does not pass easyAuth', async () => {
        const context = {
            bindings: {
                res: {}
            },
            done: jest.fn().mockReturnThis()
        }
        const req = {
            headers: { 'x-ms-client-principal-name': null }
        }

        await func(context, req)
        expect(context.bindings.res.status).toBe(401)
    })

    it('should return 404 if no tweets exists for a given user name', async () => {
        const context = {
            bindings: {
                tweets: [],
                res: {}
            },
            done: jest.fn().mockReturnThis()
        }
        const req = {
            headers: { 'x-ms-client-principal-name': 'SU-METAL' }
        }

        await func(context, req)
        expect(context.bindings.res.status).toBe(404)
    })

    it('should succeed and return tweets as array', async () => {
        const res = {}
        const tweets = [
            {Id: '1', Text: 'You are THE ONE', PartitionKey: 'SU-METAL', CreatedAt: new Date().toISOString() },
            {Id: '2', Text: 'Remember', PartitionKey: 'SU-METAL', CreatedAt: new Date().toISOString() },
            {Id: '3', Text: 'Always on your side', PartitionKey: 'SU-METAL', CreatedAt: new Date().toISOString() }
        ]
        const done = jest.fn().mockReturnThis()
        const bindings = { res, tweets }

        const headers = { 'x-ms-client-principal-name': 'SU-METAL' }

        await func({ bindings, done }, { headers })
        expect(bindings.res.status).toBe(200)

        expect(bindings.tweets).toHaveLength(3)
        bindings.res.body.forEach(tweet => {
           expect(tweet).toHaveProperty('id', expect.any(String))
           expect(tweet).toHaveProperty('text', expect.any(String))
           expect(tweet).toHaveProperty('name', 'SU-METAL')
           expect(tweet).toHaveProperty('created_at', expect.any(Date))
        });
    })
})