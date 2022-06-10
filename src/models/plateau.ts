import Order from './order';

export default class Plateau {
  orders: Order[];

  constructor(orders: Order[]) {
    this.orders = orders;
  }

  sendRoversToExplore() {
    this.orders.forEach(async (order) => {
      const { rover, instructions } = order;
      await rover.explore(instructions);
    });
  }
}
