import "./movieCard.css";
import { Link } from "react-router-dom";

let imgurl = "https://image.tmdb.org/t/p/original";

const MovieCard = ({ item }) => {
  // const [pageN, setPageN] = useState(1);
  // const dispatch = useDispatch();
  // // const prevCountPageN = useRef();

  // const movies = useSelector((state) => state.movies.upcomingMovies);

  // useEffect(() => {
  //   if (movies.length === 0) getMovies(dispatch);
  // }, []);

  // useEffect(() => {
  //   //assign the ref's current value to the count Hook
  //   prevCountPageN.current = pageN;
  // }, [pageN]);

  const truncate = (str) => {
    return str.length > 80 ? str.substring(0, 70) + "..." : str;
  };

  return (
    <Link to={`/movie/${item.id}`} className="movie-card">
      <div className="card-head">
        <img
          onError={(e) => {
            e.target.src = "/images/nf.jpg";
          }}
          src={`${imgurl}${item.poster_path}`}
          alt={item.title}
        />
      </div>
      <div className="card-body">
        <div className="card-body-head">
          <div className="card-body-title">{item.title}</div>
          <div className="card-body-rating">{`(${item.vote_average})`}</div>
        </div>
        <div className="card-body-disc">{truncate(item.overview)}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
