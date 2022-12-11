import  {useState} from 'react'
import Chart from "react-apexcharts";
export default function BarChart(props) {
    const [series,setSeries]=useState([{
      name: 'Monto ($)',
      data: props.value
    }])
      const [options,setOptions]=useState({
        chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            }
          },
          dataLabels: {
            enabled: true
          },
          xaxis: {
            categories: props.label,
          },  title: {
            text: props.text,
          
            offsetY: 0,
            align: 'center',
            style: {
              color: '#444',
         
            }
          }
        
      }) 
    return (
       <Chart height={240} width={"100%"} options={options} series={series} type="bar"  />
    )
}
