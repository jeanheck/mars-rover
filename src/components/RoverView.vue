<template>
  Esse é meu rover

  <div class="hello">
    {{ rover.xAxys }}
    {{ rover.yAxys }}
    {{ rover.cardinal }}
  </div>
</template>

<script lang="ts">
import Rover from '@/models/rover';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    rover: Rover,
  },
})
export default class RoverView extends Vue {}
</script>

<style scoped>

</style>
