module.exports = async function (context, storedStatus) {
    context.bindings.statusResponse = storedStatus

    /*
    * Take Log Tail pattern
    * https://docs.microsoft.com/en-us/azure/storage/tables/table-storage-design-patterns#log-tail-pattern
    */
    const invertTime = Number.MAX_SAFE_INTEGER - Date.now()
    context.bindings.statusByUser = {
        PartitionKey: storedStatus.user.screen_name,
        RowKey: invertTime,
        Id: storedStatus.id_str,
        Text: storedStatus.text
    }
};