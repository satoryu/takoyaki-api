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
})