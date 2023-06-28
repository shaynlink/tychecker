const {
    objectValidator,
    entryObjectValidator,
    Dictionary,
    stringValidator,
    numberValidator,
    dateValidator
} = require('../../dist/src');

module.exports.createBookValidator = objectValidator({
    usePipelineReturn: true, // For more information to return for response
    entries: [
        {
            key: ['name', 'author', 'publisher'],
            required: true,
            dataType: 'string',
            validators: [
                stringValidator({ minLength: 1 })
            ]
        },
        {
            key: 'volume',
            required: true,
            dataType: 'number',
            validators: [
                numberValidator({ minAt: 0 })
            ]
        },
        {
            key: 'limitedEdition',
            required: false,
            dataType: 'boolean'
        },
        {
            key: 'release',
            required: true,
            dataType: ['string', 'date'],
            validators: [
                dateValidator({
                    transformToDate: true,
                    minAt: new Date(2000, 1, 1)
                })
            ]
        },
    ]
})