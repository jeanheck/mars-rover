/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Axis, Order } from '@/models';

export default function sendRoversToExplore(orders: Order[], plateauSize: Axis) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      for (const [index, order] of orders.entries()) {
        const { rover, instructions } = order;
        await rover.explore(instructions, plateauSize);

        if (index === orders.length - 1) {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        }
      }
    }, 3000);
  });
}
