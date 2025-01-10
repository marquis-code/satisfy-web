<template>
    <div class=" border " v-if="!loading && Object.keys(walletTransactionsChart).length">
        <p class="font-medium text-lg border-b p-5">Transactions</p>
        <div class="p-2 m-3 flex items-center justify-center">
            <select id="orderBy" v-model="amountType" @change="updateQuery"
            class=" text-base rounded-lg text-gray-600 outline-none border-none text-center">
            <option value="wallet">Wallet</option>
            <option value="payout">Payout</option>
            <option value="commission">Commission</option>
        </select>
        </div>
        <apexchart type="bar" height="350" :options="chartOptions" :series="series" />
    </div>
    <div v-if="loading" class=" animate-pulse bg-slate-300 rounded-2xl w-full h-96"></div>
</template>

<script setup lang="ts">
import { useFetchWalletTransactionsChart } from "@/composables/wallet/fetchWalletTransactionsChart";
import ApexCharts from "vue3-apexcharts";
const { loading, walletTransactionsChart, fetchWalletTransactionsChart, metaObj } = useFetchWalletTransactionsChart();
fetchWalletTransactionsChart();
const amountType = ref('payout');
const updateQuery = () => {
    metaObj.value = {
        startDate: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        showAll: false,
        datePart: 'day',
        dataType: 'amount',
        financeType: amountType.value,
    };
    fetchWalletTransactionsChart();
};
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

}

watchEffect(() => {
    if (walletTransactionsChart.value?.datasets?.[0]?.data) {
        series.value = [
            {
                name: walletTransactionsChart.value.datasets[0].label,
                data: walletTransactionsChart.value.datasets[0]?.data.map(value => parseFloat(value).toFixed(2)) // 2 decimal places
            }
        ];
    }
    if (walletTransactionsChart.value?.labels) {
        chartOptions.value.xaxis.categories = walletTransactionsChart.value?.labels
    }
})




// const chartOptions = ref({
//     chart: {
//         height: 350,
//         type: "line",
//         toolbar: {
//             show: false,
//         },
//     },
//     stroke: {
//         curve: "smooth",
//         width: 2,
//     },
//     xaxis: {
//         categories: [
//             "9 AM",
//             "10 AM",
//             "11 AM",
//             "12 AM",
//             "1 PM",
//             "2 PM",
//             "3 PM",
//             "4 PM",
//         ],
//     },
//     yaxis: {
//         title: {
//             text: "Transactions",
//         },
//     },
//     markers: {
//         size: 4,
//     },
//     colors: ["#000000", "#00E396"],
//     dataLabels: {
//         enabled: false,
//     },
//     legend: {
//         position: "bottom",
//     },

// });

</script>

<style scoped></style>