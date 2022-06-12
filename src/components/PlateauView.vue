<template>
  <div id="plateau-view">
    <canvas
      id="plateau"
      :width="adaptPlateauSize(this.plateau.size.x)"
      :height="adaptPlateauSize(this.plateau.size.y)">
    </canvas>

    <ul class="rovers-status">
      <li v-for="rover in plateau.rovers" :key="rover.color">
        <div class="rover">
          <p class="rover-color">
            Color: {{rover.color}}
          </p>
          <p class="rover-position">
            Position: {{rover.position}}
          </p>
          <p class="rover-orientation">
            Orientation: {{rover.orientation}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  EAST, formatOrientationLabel, LEFT, MOVE, NORTH, RIGHT, SOUTH,
} from '@/utils/directions';
import {
  Axis, Plateau, Rover,
} from '@/models';

@Options({
  data() {
    return {
      unitSize: 20,
      rovers: [
        new Rover({ x: 1, y: 2 }, NORTH, [LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE], 'blue'),
        new Rover({ x: 3, y: 3 }, EAST, [MOVE, RIGHT, RIGHT, MOVE, MOVE, RIGHT, MOVE, RIGHT, RIGHT, MOVE], 'green'),
        new Rover({ x: 4, y: 0 }, NORTH, [MOVE, MOVE, MOVE, LEFT, MOVE, MOVE, MOVE, LEFT, MOVE], 'purple'),
        new Rover({ x: 0, y: 0 }, SOUTH, [MOVE, LEFT, LEFT, MOVE, MOVE, MOVE, RIGHT, MOVE], 'red'),
      ],
      plateau: new Plateau({ x: 9, y: 9 }, []),
      canvas: {} as HTMLCanvasElement,
      context: {} as CanvasRenderingContext2D,
    };
  },
  methods: {
    getPlateauLowerLeft(): Axis {
      return {
        x: 0,
        y: this.adaptPlateauSize(this.plateau.size.y) - this.unitSize,
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

      return {
        x,
        y,
      };
    },
    animate() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.plateau.rovers.forEach((rover: Rover) => {
        this.context.fillStyle = rover.color;
        this.context.strokeStyle = rover.color;
        this.context.font = '15px Arial';

        const adaptedPosition = this.adaptRoverPosition(rover.position);

        this.context.fillText(
          formatOrientationLabel(rover.orientation),
          adaptedPosition.x + 3,
          adaptedPosition.y + 15,
        );

        this.context.strokeRect(
          adaptedPosition.x,
          adaptedPosition.y,
          this.unitSize,
          this.unitSize,
        );
      });
    },
  },
  mounted() {
    this.canvas = document.getElementById('plateau') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.plateau.rovers = this.rovers;
    this.plateau.sendRoversToExplore();

    setInterval(this.animate, 25);
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
  .rovers-status {
    list-style: none;
  }
</style>
