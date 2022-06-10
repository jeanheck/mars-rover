<template>
  <div id="plateau-view">
    <canvas id="plateau" width="700" height="700"></canvas>
  </div>
</template>

<script lang="ts">
import Rover from '@/models/rover';
import { NORTH } from '@/models/directions';
import { Options, Vue } from 'vue-class-component';

@Options({
  data() {
    return {
      roverOne: new Rover(0, 0, NORTH),
    };
  },
  methods: {
    animate() {
      const canvas = document.querySelector('canvas');
      const context = canvas?.getContext('2d');

      requestAnimationFrame(this.animate);
      context?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);

      console.log('go');
    },
  },
  mounted() {
    const canvas = document.querySelector('canvas');
    const context = canvas?.getContext('2d');

    if (context) {
      context.fillStyle = 'green';
    }

    context?.fillRect(
      this.roverOne.getXAxys(),
      this.roverOne.getYAxys(),
      14,
      14,
    );

    setTimeout(() => {
      this.roverOne.setXAxys(15);
      this.roverOne.setYAxys(15);

      context?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);

      context?.fillRect(
        this.roverOne.getXAxys(),
        this.roverOne.getYAxys(),
        14,
        14,
      );

      // this.animate();
    }, 3000);
  },
})
export default class PlateauView extends Vue {}
</script>

<style scoped>
  #plateau {
    border:1px solid #000000;

  }
</style>
