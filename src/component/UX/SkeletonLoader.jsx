import "../UI/SkeletonLoader.scss"
const SkeletonLoader = ({ count = 6 }) => {

  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-img"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line small"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

