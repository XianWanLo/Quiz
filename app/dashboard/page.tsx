"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Define a simple Card component for displaying stats
const StatCard: React.FC<{ title: string; value: any }> = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const router = useRouter();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch("/api/check-auth");
      const data = await response.json();
      if (!data.isLoggedIn) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setIsLoggedIn(true); // Mark the user as logged in
      }
    };

    checkLoginStatus();
  }, [router]);

  // Fetch statistics from the backend API
  useEffect(() => {
    if (!isLoggedIn) return; // Wait until login status is determined

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Error fetching stats: ${response.statusText}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStats();
  }, [isLoggedIn]);

  // Loading or error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stats) {
    return <div>Loading...</div>;
  }

  // Group question responses by questionId
  const groupedQuestions = stats.questionData.reduce((acc: any, curr: any) => {
    const { questionId, selectedAnswer, _count } = curr;

    if (!acc[questionId]) {
      acc[questionId] = [];
    }

    acc[questionId].push({ selectedAnswer, count: _count.selectedAnswer });
    return acc;
  }, {});

  
  // Function to generate random colors
  const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

    // Prepare data for Output Repetition (Pie Chart)
    const outputRepetitionData = {
      labels: stats.outputRepetition.map((output: any) => output.output_name),
      datasets: [
        {
          data: stats.outputRepetition.map((output: any) => output.count),
          backgroundColor: generateColors(stats.outputRepetition.length),  // Generate colors dynamically
          borderColor: generateColors(stats.outputRepetition.length).map(color => color.replace('0.6', '1')),  // Opaque borders
          borderWidth: 1,
        },
      ],
    };
    const pieChartOptions = {
      plugins: {
        legend: {
          display: false, // Hide the default legend
        },
      },
    };
  
      // Prepare data for Page Views (Bar Chart)
  const pageViewsData = {
    labels: stats.pageViews.map((page: any) => page.page),  // Pages (e.g., home, about, etc.)
    datasets: [
      {
        label: "Page Views",
        data: stats.pageViews.map((page: any) => page._sum.views),  // Views count
        backgroundColor: generateColors(stats.pageViews.length),  // Dynamic colors
        borderColor: generateColors(stats.pageViews.length).map(color => color.replace('0.6', '1')),  // Opaque borders
        borderWidth: 1,
      },
    ],
  };
  // Prepare data for Traffic by Device (Horizontal Bar Chart)
  const deviceTrafficData = {
    labels: stats.deviceTraffic.map((traffic: any) => traffic.deviceType),
    datasets: [
      {
        label: "Traffic by Device",
        data: stats.deviceTraffic.map((traffic: any) => traffic._count.deviceType),
        backgroundColor: generateColors(stats.deviceTraffic.length),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Traffic by Channel (Horizontal Bar Chart)
  const channelTrafficData = {
    labels: stats.channelTraffic.map((traffic: any) => traffic.channel),
    datasets: [
      {
        label: "Traffic by Channel",
        data: stats.channelTraffic.map((traffic: any) => traffic._count.channel),
        backgroundColor: generateColors(stats.channelTraffic.length),
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Average Response Time by Page (Horizontal Bar Chart)
  const responseTimeData = {
    labels: stats.avgResponseTimeByPage.map((page: any) => page.page),
    datasets: [
      {
        label: "Average Response Time (ms)",
        data: stats.avgResponseTimeByPage.map((page: any) => page._avg.responseTime),
        backgroundColor: generateColors(stats.avgResponseTimeByPage.length),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Question Responses (Horizontal Bar Chart)
  const questionResponseData = Object.keys(groupedQuestions).map((questionId) => {
    const options = groupedQuestions[questionId];
    const colors = generateColors(options.length); // Generate different colors for each option

    return {
      questionId, // Add questionId here for displaying in the label
      chartData: {
        labels: options.map((opt: any) => opt.selectedAnswer),
        datasets: [
          {
            label: 'Responses', // Display question ID in the chart label
            data: options.map((opt: any) => opt.count),
            backgroundColor: colors, // Assign different colors for each option
            borderColor: colors.map(color => color.replace('0.6', '1')), // Set border colors to fully opaque
            borderWidth: 1,
          },
        ],
      },
    };
  });

  // Chart options for horizontal bar charts
  const horizontalBarOptions = {
    indexAxis: 'y' as const, // This makes the bar chart horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },

  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Game Dashboard</h1>
  {/* Logout Button */}
  <div className="flex justify-center mt-6">
  <button
  onClick={async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');  // Redirect to login after logging out
  }}
  className="bg-red-500 text-white px-4 py-2 rounded-lg absolute right-4 top-4"
>
  Logout
</button>

      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Game Starts" value={stats.totalGameStarts} />
        <StatCard title="Total Game Completions" value={stats.totalGameCompletions} />
        <StatCard title="Average Game Time (seconds)" value={stats.avgGameTime?.toFixed(2)} />
      </div>

      {/* Main Section Split into Two Parts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Section: Data by Questions */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Question Responses</h2>
          {questionResponseData.map((data, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Question: {data.questionId}</h3>
              <Bar data={data.chartData} options={horizontalBarOptions} />
            </div>
          ))}
        </div>
     
    

        {/* Right Section: Traffic by Device, Channel, Response Time */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Traffic & Response Time</h2>

          {/* Traffic by Device (Horizontal Bar) */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Traffic by Device</h3>
            <Bar data={deviceTrafficData} options={horizontalBarOptions} />
          </div>

          {/* Traffic by Channel (Horizontal Bar) */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Traffic by Channel</h3>
            <Bar data={channelTrafficData} options={horizontalBarOptions} />
          </div>

          {/* Average Response Time by Page (Horizontal Bar) */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Average Response Time by Page (ms)</h3>
            <Bar data={responseTimeData} options={horizontalBarOptions} />
          </div>

 {/* Page Views Bar Chart */}
 <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Page Views</h2>
          <Bar data={pageViewsData} options={horizontalBarOptions} />
        </div>
        
                {/* Right Section: Output Repetition (Pie Chart with Labels on the Right) */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex">
        <h3 className="text-xl font-semibold mb-2">Selected Output</h3>
          <div className="w-96 h-96">
            <Pie data={outputRepetitionData} options={pieChartOptions} />
          </div>
          <div className="ml-6 flex flex-col justify-center">
            {/* Manually display the labels on the right */}
            {outputRepetitionData.labels.map((label, index) => (
              <div key={index} className="flex items-center mb-2">
                <span
                  className="w-4 h-4 inline-block mr-2"
                  style={{
                    backgroundColor: outputRepetitionData.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      
        </div>
      </div>

    
    </div>
  );
};

export default StatsPage;
