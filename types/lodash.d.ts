import _ from 'lodash';

declare module '#app' {
  interface NuxtApp {
    $lodash: typeof _;
  }
}