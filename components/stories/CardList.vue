<template>
    <main>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div v-for="(itm, idx) in stories" :key="idx" class="rounded-lg border border-gray-200 space-y-6">
          <div class="flex justify-end items-end px-4 pt-4 relative">
            <b-dropdown id="dropdown-1" class="m-md-2" variant="link" right toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <img class="cursor-pointer" src="@/assets/icons/horizontal-more.svg" alt="" />
              </template>
              <b-dropdown-item-button @click="notifyUser(itm)">
                Notify User</b-dropdown-item-button>
              <b-dropdown-item-button @click="removeUser(itm)">
                Remove</b-dropdown-item-button>
            </b-dropdown>
          </div>
          <div class="px-4">
            <img src="@/assets/img/stori.png" class="h-10 w-10 rounded-full" alt="" />
          </div>
          <h1 class="px-4 text-sm text-gray-700">{{ itm?.desc || 'N/A' }}</h1>
          <div class="flex justify-between items-center px-4">
            <img src="@/assets/icons/reactions.svg" alt="" />
            <img src="@/assets/icons/stori-eclipse.svg" alt="" />
          </div>
          <div class="border-t border-gray-300 flex justify-end items-end">
            <p class="text-gray-400 text-sm font-medium px-4 pt-3">
              {{ itm?.date || 'N/A' }}
            </p>
          </div>
        </div>
      </div>
  
      <b-modal id="notifyUserModal" size="lg" centered hide-header hide-footer>
        <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
          <div>
            <h1 class="text-xl text-gray-900 font-semibold">Notify user</h1>
            <p class="text-sm text-gray-500">
              Use this form to send a user update
            </p>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-gray-900 font-medium">Message category</label>
            <select v-model="form.category"
              class="bg-gray-50 text-sm rounded-md w-full outline-none py-3 border-gray-300 border pl-3">
              <option>Violation of story policies</option>
              <option>Sharing Nudes</option>
            </select>
          </div>
          <div class="w-full space-y-2">
            <label class="text-sm font-medium">Description</label>
            <div class="mavonEditor z-0">
              <no-ssr>
                <mavon-editor :language="'en'" :toolbars="markdownOption" v-model="form.desc" />
              </no-ssr>
            </div>
          </div>
          <div class="flex justify-end items-end gap-x-3 w-full pt-6">
            <button :disabled="processingNotification || !isNotificationFormEnabled" @click="handleNotification"
              class="bg-[#0BA9B9]text-sm disabled:cursor-not-allowed bg-[#0BA9B9] disabled:opacity-25 w-full text-white font-medium px-6 py-3 rounded-lg">
              {{ processingNotification ? "processing..." : "Notify user" }}
            </button>
          </div>
        </section>
      </b-modal>
  
      <b-modal id="notifyUserSuccessModal" hide-header centered hide-footer>
        <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
          <div>
            <img src="@/assets/icons/success.svg" class="h-20 w-20" alt="warning" />
          </div>
          <div>
            <h1 class="font-semibold text-xl">Success</h1>
            <p class="text-gray-600">Message has been sent.</p>
          </div>
          <div class="flex justify-end items-end gap-x-3 w-full pt-6">
            <button @click="$bvModal.hide('notifyUserSuccessModal')"
              class="text-[#0BA9B9] text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
              Create another
            </button>
            <button @click="$bvModal.hide('notifyUserSuccessModal')"
              class="bg-[#0BA9B9] text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
              Continue
            </button>
          </div>
        </section>
      </b-modal>
  
      <b-modal id="removeStoriConfirmation" centered hide-header hide-footer>
        <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
          <div>
            <img src="@/assets/icons/danger.svg" class="h-20 w-20" alt="warning" />
          </div>
          <div>
            <h1 class="font-semibold text-xl">Remove story</h1>
            <p class="text-gray-500">
              Are you sure you want to delete this story? This action cannot be
              undone.
            </p>
          </div>
          <div class="flex justify-end items-end gap-x-3 w-full pt-6">
            <button @click="$bvModal.hide('removeStoriConfirmation')"
              class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
              Cancel
            </button>
            <button :disabled="processingDelete" @click="handleRemoveStori"
              class="bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
              {{ processingDelete ? "processing..." : "Remove" }}
            </button>
          </div>
        </section>
      </b-modal>
  
      <b-modal id="removeStoriSuccess" centered hide-header hide-footer>
        <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
          <div>
            <img src="@/assets/icons/success.svg" class="h-20 w-20" alt="warning" />
          </div>
          <div>
            <h1 class="font-semibold text-xl">Story removed</h1>
            <p class="text-gray-500">
              You have successfully removed the story, kindly note that it cannot
              be recovered.
            </p>
          </div>
          <div class="flex justify-end items-end gap-x-3 w-full pt-6">
            <button @click="$bvModal.hide('removeStoriSuccess')"
              class="bg-[#000000] text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
              Close
            </button>
          </div>
        </section>
      </b-modal>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        value: "",
        processingNotification: false,
        processingDelete: false,
        markdownOption: {
          bold: true,
          italic: true,
          header: true,
          underline: true,
          strikethrough: true,
          mark: true,
          superscript: true,
          subscript: true,
          quote: true,
          ol: true,
          ul: true,
          link: true,
        },
        form: {
          category: "",
          desc: "",
        },
      };
    },
    props: {
      stories: {
        type: Array,
        required: true,
        default: () => []
      },
    },
    methods: {
      notifyUser() {
        this.$bvModal.show("notifyUserModal");
      },
      handleNotification() {
        this.processingNotification = true;
        setTimeout(() => {
          this.$bvModal.hide("notifyUserModal");
          this.$bvModal.show("notifyUserSuccessModal");
          this.processingNotification = false;
        }, 3000);
      },
      handleRemoveStori() {
        this.processingDelete = true;
        setTimeout(() => {
          this.$bvModal.hide("removeStoriConfirmation");
          this.$bvModal.show("removeStoriSuccess");
          this.processingDelete = false;
        }, 3000);
      },
      removeUser() {
        this.$bvModal.show("removeStoriConfirmation");
      },
    },
    computed: {
      isNotificationFormEnabled() {
        return this.form.desc && this.form.category;
      },
    },
  };
  </script>
  
  <style></style>
  