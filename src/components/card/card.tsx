import { Link } from 'react-router-dom';
import { Offers } from '../../types/offer';
import classNames from 'classnames';
import Bookmark from '../bookmark/bookmark';
import { formatRating } from '../../utils';

type CardProps = Offers & {
  environment: 'cities' | 'favorites' | 'near-places';
  handleMouseHover: (id?: string) => void;
};

function Card({
  id,
  title,
  type,
  price,
  isFavorite,
  isPremium,
  rating,
  previewImage,
  environment,
  handleMouseHover
}: CardProps): JSX.Element {

  const handleMouseOn = () => {
    handleMouseHover(id);
  };
  const handleMouseOff = () => {
    handleMouseHover();
  };

  const imgWidth = environment === 'favorites' ? '150' : '260';
  const imgHeight = environment === 'favorites' ? '110' : '200';

  return (
    <article className={`${environment}__card place-card`} onMouseEnter={handleMouseOn} onMouseLeave={handleMouseOff} >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${environment}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imgWidth} height={imgHeight} alt="Place image" />
        </Link>
      </div>
      <div className={classNames('place-card__info', {'favorites__card-info': isFavorite})}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isActive={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: formatRating(rating),
            }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;