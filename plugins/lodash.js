import _ from 'lodash';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('lodash', _);
});

/*
example usage:
  import { useNuxtApp } from '#app';
  const { $lodash } = useNuxtApp();
  const text = ref('hello');
  const capitalizedText = ref($lodash.capitalize(text.value));
  console.log(`DEBUG - capitalizedText: ${capitalizedText.value}`)
*/