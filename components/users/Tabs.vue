<template>
    <div>
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <a href="#" v-for="item in breadcrumbTabs" :key="item.key" @click.prevent="handleSelectedTab(item.key)"
                    :class="[activeTable === item.key ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
                    class=" whitespace-nowrap  border-b-4 py-1.5 px-1 text-sm font-medium">
                    {{ item.text }}</a>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
const activeTable = ref("insight")
const router = useRouter()
const route = useRoute()

const breadcrumbTabs = ref([
    {
        key: 'insight',
        text: "Insight",
    },
    {
        key: 'stori',
        text: "Stori",
    },
    {
        key: 'wallet',
        text: "Wallet & Payout",
    }
])

onMounted(() => {
    emit('selected', activeTable.value)
    router.push({ path: route.path, query: { page: activeTable.value } })
})

const emit = defineEmits<{
    (event: 'selected', state: string): void
}>()

const handleSelectedTab = (item: any) => {
    activeTable.value = item
    router.push({ path: route.path, query: { page: item } })
    emit('selected', item)
}
</script>