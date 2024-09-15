<template>
    <main>
        <div class="inline-block min-w-full py-2 align-middle border-gray-100 rounded-b-lg border bg-white shadow">
            <table class="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th v-for="item in header" :key="item.key" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            <slot v-if="$slots[`header-${item.key}`]" :name="`header-${item.key}`" v-bind="item" />
                            <span v-else>{{ item.label }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                    <tr class="odd:bg-gray-50" v-for="item in fields" :key='item.id'>
                        <td v-for="headerItem in header" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            @click="$emit('rowClicked', item)">
                            <slot v-if="$slots[`item-${headerItem.key}`]" :name="`item-${headerItem.key}`"
                                v-bind="item" />
                            <span v-else>{{ item[headerItem.key] }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup>

const props = defineProps({
    header: Array,
    fields: Array
})

</script>

<style scoped></style>