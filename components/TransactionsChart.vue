<template>
    <div class="border" v-if="!loading && Object.keys(walletTransactionsChart).length">
        <div class="p-2 w-1/3">
            <date-picker v-model="dateRange" :format="'YYYY-MM-DD'" range :placeholder="'Select date range'"
                @update:value="handleDateRangeChange" :disabled-date="() => null" />
        </div>
        <div class="p-2 m-3 flex items-center justify-center">
            <select id="orderBy" v-model="chartAmountType" @change="updateQuery"
                class="text-base rounded-lg text-gray-600 outline-none border-none text-center">
                <option value="wallet">Wallet</option>
                <option value="payout">Payout</option>
                <option value="commission">Commission</option>
            </select>
        </div>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series" />
    </div>
    <div v-if="loading" class="animate-pulse bg-slate-300 rounded-2xl w-full h-96"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, watchEffect } from 'vue';
import { useFetchWalletTransactionsChart } from "@/composables/wallet/fetchWalletTransactionsChart";
import ApexCharts from "vue3-apexcharts";
import DatePicker from 'vue-datepicker-next';
const { loading, walletTransactionsChart, fetchWalletTransactionsChart, metaObj } = useFetchWalletTransactionsChart();

const props = defineProps({
    amountType: {
        type: String,
        default: 'wallet',
    },
});

const chartAmountType = ref(props.amountType);
const dateRange = ref([null, null]);

const handleDateRangeChange = (dates: [string, string] | null) => {
    if (dates && dates.length === 2) {
        const [startDate, endDate] = dates.map((date) => {
            return new Date(date).toISOString().split('T')[0]; 
        });
        metaObj.value = {
            startDate,
            endDate,
            showAll: false,
            datePart: 'day',
            dataType: 'amount',
            financeType: chartAmountType.value,
        };
        fetchWalletTransactionsChart();  
    }
};

const updateQuery = () => {
    if (!dateRange.value[0] || !dateRange.value[1]) {
        metaObj.value = {
            startDate: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            showAll: false,
            datePart: 'day',
            dataType: 'amount',
            financeType: chartAmountType.value,
        };
    }
    fetchWalletTransactionsChart();  
};

watch(() => props.amountType, (newAmountType) => {
    chartAmountType.value = newAmountType;
    updateQuery();  
}, { immediate: true });

onMounted(() => {
    updateQuery();  
});

const series = ref([] as any);
const chartOptions = ref({} as any);
chartOptions.value = {
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            columnWidth: '50%',
        }
    },
    colors: ['#000'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 0
    },
    grid: {
        row: {
            colors: ['#fff', '#f2f2f2']
        }
    },
    xaxis: {
        labels: {
            rotate: -45
        },
        categories: walletTransactionsChart.value?.labels,
        tickPlacement: 'on'
    },
};

watchEffect(() => {
    if (walletTransactionsChart.value) {
        console.log('walletTransactionsChart updated:', walletTransactionsChart.value);  
        if (walletTransactionsChart.value?.datasets?.[0]?.data) {
            series.value = [
                {
                    name: walletTransactionsChart.value.datasets[0].label,
                    data: walletTransactionsChart.value.datasets[0]?.data.map(value => parseFloat(value).toFixed(2))  
                }
            ];
        }
        if (walletTransactionsChart.value?.labels) {
            chartOptions.value.xaxis.categories = walletTransactionsChart.value?.labels;
        }
    }
});
</script>

<style scoped></style>