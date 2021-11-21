import React from 'react';
import { Pie } from 'react-chartjs-2';













const BlueTheme = {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
}


const data = {
    labels: ['Kazanılan Para', 'Kaybedilen Para', 'Kazanılan Oyun', 'Kaybedilen Oyun'],
    datasets: [
        {
            label: '# of Votes',
            data: [1200, 300, 12],
            backgroundColor: [
                BlueTheme['300'],
                BlueTheme['500'],
                BlueTheme['700'],
                BlueTheme['800'],
            ],
            borderColor: [
                BlueTheme['300'],
                BlueTheme['500'],
                BlueTheme['700'],
                BlueTheme['800'],
            ],
            borderWidth: 1,
        },
    ],
};

const BalanceChartPie = () => (
    <>
        <Pie data={data} />
    </>
);

export default BalanceChartPie;