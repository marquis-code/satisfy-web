<template>
    <div class="border" v-if="!loading && Object.keys(walletTransactionsChart).length">
        <div class="w-full flex lg:items-center justify-between my-4 flex-col lg:flex-row">
            <div class="flex gap-1 items-center ml-5">
                <input type="radio" id="amount" name="data_type" value="amount" v-model="data_type"
                    @change="updateQuery">
                <label for="amount">Amount</label>
                <input class=" ml-10" type="radio" id="count" name="data_type" value="count" v-model="data_type"
                    @change="updateQuery">
                <label for="count">Count</label>
            </div>
            <div class=" flex items-center gap-5 mr-5">
                <div>
                    <date-picker v-model="dateRange" :format="'YYYY-MM-DD'" range :placeholder="'Select date range'"
                        @update:value="handleDateRangeChange" :disabled-date="() => null" />
                </div>
                <select id="orderBy" v-model="chartAmountType" @change="updateQuery"
                    class="text-base rounded-lg text-gray-600  text-center">
                    <option value="wallet">Wallet</option>
                    <option value="payout">Payout</option>
                    <option value="commission">Commission</option>
                </select>
                <select v-model="part" @change="updateQuery" class="text-base rounded-lg text-gray-600  text-center">
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
            </div>

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
const part = ref('day');
const data_type = ref('amount');

const handleDateRangeChange = (dates: [string, string] | null) => {
    if (dates && dates.length === 2) {
        const [startDate, endDate] = dates.map((date) => {
            return new Date(date).toISOString().split('T')[0];
        });
        metaObj.value = {
            startDate,
            endDate,
            showAll: false,
            datePart: part.value,
            dataType: data_type.value,
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
            datePart: part.value,
            dataType: data_type.value,
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
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        toolbar: { show: false },
        height: 350,
        type: "bar"
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 4,
            columnWidth: '40%',
            barHeight: '40%',
            endingShape: 'rounded',
            dataLabels: {
                position: 'top',
            },
        },
    },
    colors: ['#93c5fd'],
    dataLabels: {
        enabled: true,
        formatter: (val) => {
            return val.toLocaleString();
        },
        style: {
            colors: ['#000'],
        },
        offsetX: -10,
        offsetY: -25,
        textAnchor: "start"
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
    tooltip: {
        y: {
            formatter: (val) => {
                return val.toLocaleString();
            }
        }
    }
};

watchEffect(() => {
    if (walletTransactionsChart.value) {
        console.log('walletTransactionsChart updated:', walletTransactionsChart.value);
        if (walletTransactionsChart.value?.datasets?.[0]?.data) {
            series.value = [
                {
                    name: walletTransactionsChart.value.datasets[0].label,
                    data: walletTransactionsChart.value.datasets[0]?.data.map(value => parseFloat(value.replace(/,/g, '')))
                }
            ];
        }
        if (walletTransactionsChart.value?.labels) {
            chartOptions.value.xaxis.categories = walletTransactionsChart.value?.labels;
        }
    }
});

const updateChartColor = (type) => {
    switch (type) {
        case 'wallet':
            return ['#93c5fd'];
        case 'payout':
            return ['#000'];
        case 'commission':
            return ['#86efac'];
    }
};

watch(chartAmountType, (newType) => {
    chartOptions.value.colors = updateChartColor(newType);
}); 
</script>

<style scoped></style>