import PropTypes from 'prop-types';

const DeliverySummary = ({completedTasks}) => {
  if (completedTasks.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Summary of Completed Tasks
      </h3>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {completedTasks.map((task, index) => (
          <li key={index}>
            <span className="font-medium">{task.address}</span>: Arrived in{" "}
            <span className="text-green-600 font-semibold">{task.eta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
DeliverySummary.propTypes = {
  completedTasks: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
      eta: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DeliverySummary;