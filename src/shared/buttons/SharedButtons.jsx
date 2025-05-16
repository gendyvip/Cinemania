import styles from './SharedButtons.module.css'; 

export default function SharedButtons({ genres }) {
    return (
        <div className="d-flex flex-wrap gap-2 mt-3">
        {genres.map((genre, index) => (
          <button key={index} className={styles['genre-pill']}>
            {genre}
          </button>
        ))}
      </div>
      );
}

