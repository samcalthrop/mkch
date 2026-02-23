import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, ChartData, ChartOptions, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import classes from "./GraphView.module.css";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

export const GraphView = (): JSX.Element => {
  const data: ChartData<"line"> = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Revenue",
        data: [120, 190, 300, 250],
        borderColor: "#4f46e5",
        backgroundColor: "white",
        tension: .2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={classes.graphContainer}>
      <Line data={data} options={options} />
    </div>
  );
}
