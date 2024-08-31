<template>
    <main>
        <div v-if="fields.length">
            <UsersReferralList :header="tableHeader" :fields="fields" :loadingUsers="loading"
                :pagination="pagination">
                <template #item-createdAt="item">
                            <div>
                                <p>{{ moment.utc(item.createdAt).format('MMMM Do YYYY h:mm:ss a')  }} </p>
                            </div>
                </template> 
            </UsersReferralList>
        </div>
        <CoreEmptyState v-if="fields.length <= 0 && !loading" title="No Referrals available" desc="">
        </CoreEmptyState>
        <LoadingSpinner v-if="loading" />
    </main>
</template>

<script setup lang="ts">
import moment from 'moment'

const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});

defineProps({
    fields: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        //   required: true,
    },
    pagination: {
        type: Object,
        //   required: true,
    },
})

let tableHeader = reactive([
    {
        label: "Date",
        key: "createdAt"
    },
    {
        label: "User",
        key: "user"
    },
    {
        label: "Referrer",
        key: "referrer"
    },
    {
        label: "Referral Code",
        key: "referralCode"
    }
]);
</script>