const Mutations = {
  async createItem(parent, args, ctx, info) {
    console.log('inside the mutations => parent', parent);
    console.log('inside the mutations => args', args);
    console.log('inside the mutations => ctx', ctx);
    console.log('inside the mutations => info', info);

    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);

    console.log(item);

    return item;
  },
};

module.exports = Mutations;
