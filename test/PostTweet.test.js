const Twitter = require('twitter')
const func = require('../PostTweet')

const mockPostMethod = jest.fn()
jest.mock('twitter', () => {
    return jest.fn().mockImplementation(() => {
        return {
            post: mockPostMethod
        }
    })
})

describe('PostTweet', () => {
    beforeEach(() => {
        mockPostMethod.mockClear()
    })

    it('should return twitter api response with status 200', async () => {
        const body = {
            status: "Put your kitsune up!"
        }
        const headers = {}
        const bindings = {}
        const done = jest.fn()

        const statusResponse = { text: 'Put your Kitsune up!' }
        mockPostMethod.mockReturnValue(statusResponse)

        await func({ bindings, done }, { headers, body })
        expect(Twitter).toHaveBeenCalled()
        expect(bindings.storedStatus).toEqual(statusResponse)
        expect(bindings.res.body).toEqual(statusResponse)
    })

    it('should response 500 if twitter API raises any error', async () => {
        const body = {
            status: "Put your kitsune up!"
        }
        const headers = {}
        const bindings = {}
        const done = jest.fn()
        const log = { error: jest.fn() }

        const dummyError = new Error()
        mockPostMethod.mockImplementation(() => {
            throw dummyError
        })

        await func({ bindings, done, log }, { headers, body })

        expect(bindings.res.status).toEqual(500)
        expect(bindings.res.body).toEqual(dummyError)
        expect(log.error).toHaveBeenCalled()
        expect(done).toHaveBeenCalledWith(dummyError)
    })
})