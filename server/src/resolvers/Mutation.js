const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    await ctx.db.mutation.updateItem(
      { data: updates, where: { id: args.id } },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    await ctx.db.mutation.deleteItem({ id: args.id });
  },
};

module.exports = Mutations;
