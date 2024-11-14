import VuePictureCropper from 'vue-picture-cropper';

export default defineNuxtPlugin((nuxtApp) => {
  // Register VuePictureCropper globally in the app
  nuxtApp.vueApp.component('VuePictureCropper', VuePictureCropper);

  // Optionally, provide it globally so you can inject it into other parts of your app
  nuxtApp.provide('vuePictureCropper', VuePictureCropper);
});
