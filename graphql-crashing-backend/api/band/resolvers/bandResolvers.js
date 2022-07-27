const bandResolvers = {
  Query: {
    bands: (root, args, { dataSources }) => dataSources.bandsAPI.getBands(),
    band: (root, {id}, { dataSources }) => dataSources.bandsAPI.getBand(id)
  },
  Mutation: {
    addBand: async (root, data, { dataSources }) => dataSources.bandsAPI.addBand(data),
    deleteBand: async (root, {id}, { dataSources }) => dataSources.bandsAPI.deleteBand(id),
    editBand: async (root, newData, { dataSources }) => dataSources.bandsAPI.editBand(newData)
  }
};

module.exports = bandResolvers;