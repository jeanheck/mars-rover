<template>
  <div id="plateau-view">
    <canvas
      id="plateau"
      :width="adaptPlateauSize(this.plateauSize.x)"
      :height="adaptPlateauSize(this.plateauSize.y)">
    </canvas>

    <ul class="rovers">
      <li v-for="order in orders" :key="order.color">
        <div class="rover">
          <p class="rover-color">
            Color: {{order.color}}
          </p>
          <p class="rover-position">
            Position: {{order.rover.getPosition()}}
          </p>
          <p class="rover-orientation">
            Orientation: {{order.rover.orientation}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  EAST, LEFT, MOVE, NORTH, RIGHT, SOUTH, WEST,
} from '@/utils/directions';
import { Axis, Order, Rover } from '@/models';
import sendRoversToExplore from '@/services/exploration';

@Options({
  data() {
    return {
      unitSize: 20,
      plateauSize: new Axis(9, 9),
      orders: [
        {
          color: 'blue',
          rover: new Rover({ x: 1, y: 2 }, NORTH),
          instructions: [LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE],
        },
        {
          color: 'green',
          rover: new Rover({ x: 3, y: 3 }, EAST),
          instructions: [MOVE, RIGHT, RIGHT, MOVE, MOVE, RIGHT, MOVE, RIGHT, RIGHT, MOVE],
        },
        {
          color: 'red',
          rover: new Rover({ x: 0, y: 0 }, NORTH),
          instructions: [MOVE, MOVE, MOVE, RIGHT, MOVE, MOVE, MOVE, RIGHT, MOVE],
        },
      ] as Order[],
      adaptedPosition: new Axis(0, 0),
      canvas: {} as HTMLCanvasElement,
      context: {} as CanvasRenderingContext2D,
    };
  },
  methods: {
    getPlateauLowerLeft(): Axis {
      return {
        x: 0,
        y: this.adaptPlateauSize(this.plateauSize.y) - this.unitSize,
      };
    },
    getPositionOnPlateau(position: Axis): Axis {
      return {
        x: this.unitSize * position.x,
        y: this.unitSize * position.y,
      };
    },
    adaptPlateauSize(size: number) {
      return (size * this.unitSize) + this.unitSize;
    },
    adaptRoverPosition(position: Axis): Axis {
      const lowerLeft = this.getPlateauLowerLeft();
      const positionOnPlateau = this.getPositionOnPlateau(position);

      const x = lowerLeft.x + positionOnPlateau.x;
      const y = lowerLeft.y - positionOnPlateau.y;

      // console.log(`x -> ${x} y -> ${y}`);

      return {
        x,
        y,
      };
    },
    formatOrientationLabel(orientation: string): string {
      switch (orientation) {
        case NORTH:
          return '🡅';
        case SOUTH:
          return '🡇';
        case EAST:
          return '🡆';
        case WEST:
          return '🡄';
        default:
          return '';
      }
    },
    animate() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.orders.forEach((order: {
        color: string,
        rover: Rover
      }) => {
        // eslint-disable-next-line no-param-reassign
        this.context.fillStyle = order.color;
        this.context.font = '15px Arial';

        this.adaptedPosition = this.adaptRoverPosition(order.rover.getPosition());

        this.context.fillText(
          this.formatOrientationLabel(order.rover.orientation),
          this.adaptedPosition.x + 3,
          this.adaptedPosition.y - 3,
        );

        this.context.fillRect(
          this.adaptedPosition.x,
          this.adaptedPosition.y,
          this.unitSize,
          this.unitSize,
        );
      });
    },
  },
  mounted() {
    this.canvas = document.getElementById('plateau') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.animate();

    sendRoversToExplore(this.orders, this.plateauSize);

    setInterval(
      this.animate,
      25,
    );
  },
})
export default class PlateauView extends Vue {}
</script>

<style scoped>
  #plateau {
    border:1px solid #000000;
    padding: 0;
    margin: 0;
  }
  .rovers {
    list-style: none;
  }
</style>
