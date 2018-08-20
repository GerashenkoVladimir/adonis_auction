const serialized = (resource, serializer) => serializer.serialize(resource.toJSON())

module.exports = {serialized}
