function crudRepository (schema) {
    return {
        model: schema,
        create: async function (data) {
            const newDoc = await this.model.create(data);
            const withSenderInfo = await newDoc.populate({
                path: 'senderId',
                select: 'username email avatar',
                strictPopulate: false, // <- prevents StrictPopulateError
            });
            return withSenderInfo;
        },
        getAll: async function () {
            try {
                const allDoc = await this.model.find({});
                return allDoc;
            } catch (error) {
                console.log("error in get method of crud repository", error.message)
            }
        },
        getById: async function (id) {
            const doc = await this.model.findById(id);
            return doc;
        },
        delete: async function (id) {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        },
        update: async function (id, data) {
            const updatedDoc = await this.model.findByIdAndUpdate(id, data, {
            returnDocument: 'after',
            runValidators: true
        });
            return updatedDoc
        },
        deleteMany: async function(modelIds) {
        const response = await this.model.deleteMany({
            _id: {
                $in: modelIds
            }
        });
        return response;
        }
    }
}

export default crudRepository;