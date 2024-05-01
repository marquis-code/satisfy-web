<template>
  <main>
    <DashboardHeader />
    <div class="mx-3 md:mx-6 py-6">
      <div class="space-y-8 bg-white px-4 md:px-20 py-10 rounded-2xl">
        <div class="space-y-3">
          <p class="text-gray-900 font-semibold">Profile image</p>
          <div>
            <label class="">
              <img
                v-if="form.imageSrc"
                :src="form.imageSrc"
                alt=""
                class="has-animation h-20 w-20 object-cover object-center border-[0.8px] border-gray-400 shadow rounded-full"
              />

              <img
                v-if="!form.imageSrc"
                src="@/assets/icons/dashboard/camera.svg"
                alt=""
                class="h-20 w-20"
              />
              <input @change="onFileChange" type="file" class="hidden" />
            </label>
          </div>
        </div>
        <div
          class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10"
        >
          <div class="w-full space-y-1">
            <label class="text-xs md:text-sm font-medium">First name</label>
            <input
              v-model="form.fname"
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
              type="text"
            />
          </div>
          <div class="w-full space-y-1">
            <label class="text-xs md:text-sm font-medium">Last name</label>
            <input
              v-model="form.lname"
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
              type="text"
            />
          </div>
        </div>
        <div
          class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10"
        >
          <div class="w-full space-y-1">
            <label class="text-xs md:text-sm font-medium">Phone no.</label>
            <input
              v-model="form.phone"
              type="tel"
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            />
          </div>
          <div class="w-full space-y-1">
            <label class="text-sm font-medium">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            />
          </div>
        </div>
        <div
          class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10"
        >
          <div class="w-full space-y-1 relative">
            <label class="text-xs md:text-sm font-medium">Password</label>
            <!-- <input
        type="text"
        class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border"
      /> -->
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              placeholder=""
              v-model="form.password"
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            />
            <img
              @click="showPassword = !showPassword"
              :src="require(`@/assets/icons/${eye}`)"
              alt=""
              class="absolute cursor-pointer top-9 right-4 h-6 w-6"
            />
          </div>
          <div class="w-full space-y-1 relative">
            <label class="text-xs md:text-sm font-medium">Re-enter password</label>
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              placeholder=""
              v-model="form.confirmPassword"
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            />
            <img
              @click="showPassword = !showPassword"
              :src="require(`@/assets/icons/${eye}`)"
              alt=""
              class="absolute cursor-pointer top-9 right-4 h-6 w-6"
            />
          </div>
        </div>
        <div
          class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10"
        >
          <div class="w-full space-y-1">
            <label class="text-xs md:text-sm font-medium">Gender </label>
            <select
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
              v-model="form.gender"
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="w-full space-y-1">
            <label class="text-xs md:text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              v-model="form.dob"
              class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            />
          </div>
        </div>
        <div class="flex justify-end items-end gap-x-3">
          <button
            type="reset"
            class="text-[#0BA9B9] border-[#0BA9B9] border px-3 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            :disabled="!isFormEmpty"
            @click="$bvModal.show('createUserConfirmationModal')"
            type="submit"
            class="bg-[#0BA9B9] disabled:cursor-not-allowed disabled:opacity-25 text-white px-6 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    <div>
      <b-modal
        id="createUserConfirmationModal"
        hide-header
        hide-footer
        centered
      >
        <section class="bg-white p-6 space-y-4 max-w-screen-lg rounded-md">
          <div>
            <img src="@/assets/icons/warning.svg" alt="warning" />
          </div>
          <div>
            <h1 class="font-semibold text-xl">Confirm</h1>
            <p class="text-gray-500">
              Are you sure you want to continue?
            </p>
          </div>
          <div class="flex justify-end items-end gap-x-3 w-full pt-6">
            <button
              @click="$bvModal.hide('createUserConfirmationModal')"
              class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              :disabled="processing"
              @click="createUser"
              class="bg-[#0BA9B9] text-sm disabled:cursor-not-allowed disabled:opacity-25 w-full text-white font-medium px-6 py-3 rounded-lg"
            >
              {{ processing ? "processing" : "Continue" }}
            </button>
          </div>
        </section>
      </b-modal>

      <b-modal id="createUserSuccessModal" hide-header centered hide-footer>
        <section class="bg-white p-6 space-y-4 max-w-screen-lg rounded-md">
          <div>
            <img src="@/assets/icons/success.svg" alt="warning" />
          </div>
          <div>
            <h1 class="font-semibold text-xl">Success</h1>
            <p class="text-gray-500">New user added.</p>
          </div>
          <div class="flex justify-end items-end gap-x-3 w-full pt-6">
            <button
              @click="$bvModal.hide('createUserSuccessModal')"
              class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg"
            >
              Create another
            </button>
            <button
              @click="$router.push('/dashboard/users')"
              class="bg-[#0BA9B9] text-sm w-full text-white font-medium px-6 py-3 rounded-lg"
            >
              Continue
            </button>
          </div>
        </section>
      </b-modal>
    </div>
  </main>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      showModal: false,
      processing: false,
      showPassword: false,
      form: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dob: "",
        imageSrc: null,
      },
      genderType: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],
    };
  },
  computed: {
    eye() {
      return !this.showPassword ? "eye-close.svg" : "eye-open.svg";
    },
    isFormEmpty() {
      return !!(
        this.form.fname &&
        this.form.lname &&
        this.form.phone &&
        this.form.email &&
        this.form.password &&
        this.form.confirmPassword &&
        this.form.gender &&
        this.form.dob
      );
    },
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.form.imageSrc = URL.createObjectURL(file);
      } else {
        this.form.imageSrc = null;
      }
    },
    createUser() {
      this.processing = true;
      setTimeout(() => {
        this.processing = false;
        this.$bvModal.hide("createUserConfirmationModal");
        this.$bvModal.show("createUserSuccessModal");
      }, 2000);
    },
  },
};
</script>

<style scoped>
.has-animation {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
