<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        class="bg-white p-6 w-full max-w-md shadow-md rounded-lg"
        @submit.prevent="sendMessage"
      >
        <h2 class="text-2xl font-bold text-center mb-6">Contact Us</h2>
  
        <label for="name" class="block font-medium">Name:</label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          required
          class="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
  
        <label for="email" class="block font-medium mt-4">Email:</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          required
          class="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
  
        <label for="message" class="block font-medium mt-4">Message:</label>
        <textarea
          v-model="formData.message"
          id="message"
          rows="4"
          required
          class="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
  
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600 transition"
        >
          Send Message
        </button>
  
        <p v-if="responseMessage" :class="responseMessageColor" class="text-center mt-4">
          {{ responseMessage }}
        </p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Reactive form data
  const formData = ref({
    name: '',
    email: '',
    message: '',
  });
  
  // Response message and its color
  const responseMessage = ref('');
  const responseMessageColor = ref('');
  
  // Send message function
  const sendMessage = async () => {
    const payload = {
      service_id: 'service_cnhmvpe',
      template_id: 'template_nsfhhyp',
      user_id: 'lMgU7zkiVtC-oLaxE',
      template_params: {
        fullname: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
        to_email: 'abahmarquis@gmail.com',
      },
    };
  
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        responseMessage.value = 'Message sent successfully!';
        responseMessageColor.value = 'text-green-600';
        // Reset form after success
        formData.value.name = '';
        formData.value.email = '';
        formData.value.message = '';
      } else {
        responseMessage.value = 'Error sending message. Try again.';
        responseMessageColor.value = 'text-red-600';
      }
    } catch (error) {
      responseMessage.value = 'Error sending message. Try again.';
      responseMessageColor.value = 'text-red-600';
    }
  };
  </script>
  
  <style>
  /* Tailwind CSS is used for styling */
  </style>
  