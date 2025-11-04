const ProgressBar = ({ completed, total, color = 'arathu' }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  const colorClasses = {
    arathu: 'bg-arathu-primary',
    porut: 'bg-porut-primary',
    kamathu: 'bg-kamathu-primary',
    gradient: 'bg-gradient-to-r from-arathu-primary via-porut-primary to-kamathu-primary'
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{completed} / {total}</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
