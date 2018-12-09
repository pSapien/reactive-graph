const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    const where = { id: args.id };
    delete updates.id;
    await ctx.db.mutation.updateItem({ data: updates, where }, info);
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    return await ctx.db.mutation.deleteItem({ where });
  },
};

module.exports = Mutations;
