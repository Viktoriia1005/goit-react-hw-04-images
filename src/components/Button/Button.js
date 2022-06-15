import s from './Button.module.css';

function LoadMoreButton({ onLoadMore }) {
  return (
    <button onClick={onLoadMore} className={s.Button} type="button">
      Load more
    </button>
  );
}

export default LoadMoreButton;
