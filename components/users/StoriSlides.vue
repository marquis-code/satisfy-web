<template>
    <main class="mx-9 py-5">
        <div v-if="item.coverImage">
            <img :src="item.coverImage" class="h-10 w-10 rounded-full object-cover object-center" alt="avatar" />
        </div>
        <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
            {{ generateInitials(story?.user?.fname, story?.user?.lname) }}
        </div>
        <div class="text-sm my-1 font-bold leading-6 text-gray-900">{{ item.title }}</div>
        <div class="text-sm leading-6 text-gray-500">{{ item.content }}</div>
        <div class="my-2 flex justify-between items-center">
            <div class="flex gap-4">
                <div class="flex items-center gap-2 text-sm leading-6 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>{{ item.viewsCount ?? 'Nil' }}
                </div>
                <div class="flex items-center gap-2 text-sm leading-6 text-gray-300" @click="toggleComments">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15V5a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12l6 4v-4h-2z" />
                    </svg>{{ comments?.result?.length }}
                </div>
            </div>
            <div class="text-sm leading-6 text-gray-300">{{ item.createdAt || 'Nil' }}</div>
        </div>


        <div v-if="showComments">
            <div v-if="loading">Loading comments...</div>
            <div class="mt-4 pb-7" v-else-if="comments?.result?.length > 0">
                <h6 class="text-sm my-1 font-bold leading-6 text-gray-900">Comments:</h6>
                <div class="mt-4" v-for="comment in comments.result" :key="comment.id">
                    <p class="text-sm font-bold leading-6 text-gray-900">
                        <small>{{ comment.user.fname }} {{ comment.user.lname }}</small>
                    </p>
                    <p class="text-sm mt-0 leading-6 text-gray-500">{{ comment.content }}</p>
                    <p class="text-sm float-end leading-6 text-gray-300">{{ comment.createdAt || 'Nil' }}</p>
                </div>
            </div>
            <div v-else>No comments found.</div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useFetchSlideComments } from '@/composables/story/getStorySlideComments';

const { fetchSlideComments, comments, loading } = useFetchSlideComments();

const props = defineProps<{
  item: any;
  story: any;
  isActive: boolean; 
}>();


const generateInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};

onMounted(() => {
    fetchSlideComments(props.item.id);
});

const showComments = ref(false); 

const toggleComments = () => {
    showComments.value = !showComments.value; 
};

watch(() => props.isActive, (newVal) => {
  if (!newVal) {
    showComments.value = false; 
  }
});

</script>
