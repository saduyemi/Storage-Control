import { Chart, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, Colors);

export function HomeChart({items}) {

    const categories = countCategories(items);
    const categoriesLabels = Object.keys(categories);
    const categoriesValues = Object.values(categories);

    const data = {
        labels: categoriesLabels,
        datasets: [{
            label: 'Poll',
            data: categoriesValues,
            //backgroundColor: ['green', 'blue'],
            //borderColor: ['green', 'blue'],
        }]
    };

    const options = {
        plugins: {
            colors: {
                forceOverride: true
            }
        }
    };


    return (
        <> 
            <Doughnut data={data} options={options}></Doughnut>
        </>
    );
}

function countCategories(itemsList) {
    //console.log(itemsList);
    let some = {};

    for (let item of itemsList) {
        if (some[item.ItemCategory]) {
            some[item.ItemCategory] += 1;
        }
        else {
            some[item.ItemCategory] = 1;
        }
        //console.log(item);
    }
    //kconsole.log(some);
    return some;
}

/*
export function HomeChart() {
    const data = {
        labels: ['Yes', 'No'],
        datasets: [{
            label: 'Poll',
            data: [2, 4],
            backgroundColor: ['green', 'blue'],
            borderColor: ['green', 'blue']
        }]
    };

    const options = {};


    return (
        <> 
            <Doughnut data={data} options={options}></Doughnut>
        </>
    );
}
*/