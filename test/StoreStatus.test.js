const func = require('../StoreStatus')

describe('StoreStatus', () => {
    it('should store a given JSON string into Blob Storage', async () => {
        const storedStatus = {
            id_str: '4444',
            text: 'We are BABYMETAL',
            user: { screen_name: 'SU-METAL' },
            created_at: new Date().toISOString()
        }
        const bindings = {}
        const done = jest.fn().mockReturnThis()

        await func({ bindings, done }, storedStatus)

        expect(bindings.statusByUser).toEqual(
            expect.objectContaining({
                PartitionKey: storedStatus.user.screen_name,
                RowKey: expect.any(Number),
                Text: storedStatus.text,
                Id: storedStatus.id_str,
                CreatedAt: new Date(storedStatus.created_at)
            })
        )
        expect(bindings.statusResponse).toEqual(storedStatus)
    })
})