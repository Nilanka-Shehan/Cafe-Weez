import PropTypes from 'prop-types';

const ReviewCard = ({review}) => {
  return (
    <div className="card bg-gamboge text-primary-content w-full  sm:w-[calc(100%-3px)] md:min-h-[340px] p-1 rounded-3xl shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">{review.name}</h2>
        <h4 className="font-semibold text-white text-lg mb-2">{review.title}</h4>
        <p className="line-clamp-6 text-white text-sm">
          {review.content}
        </p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewCard;
