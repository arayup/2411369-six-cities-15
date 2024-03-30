import { SortOption } from './components/sort';
import { CityName } from './const';
import { ServerOffer } from './types/offer';
import { Review } from './types/review';

const enum Default {
  ScalingFactor = 100 / 5
}

export function formatRating(rating: number) {
  return `${Math.round(Default.ScalingFactor * rating)}%`;
}

const MAX_NEAR_OFFERS = 3;

export const getNearOffers = (
  offers: ServerOffer[],
  id: string | undefined,
  city: CityName
) => {
  const nearOffers: ServerOffer[] = [];

  for (const offer of offers) {
    if (id !== offer.id && city === offer.city.name) {
      nearOffers.push(offer);
    }

    if (nearOffers.length === MAX_NEAR_OFFERS) {
      break;
    }
  }

  return nearOffers;
};

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(date));
}

export function sortReviewsDate(reviews: Review[]) {
  return reviews.toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function sortOffers(allOffers: ServerOffer[], sortOption: SortOption) {
  switch (sortOption) {
    case SortOption.PriceLowToHigh:
      return allOffers.toSorted((a, b) => a.price - b.price);
    case SortOption.PriceHighToLow:
      return allOffers.toSorted((a, b) => b.price - a.price);
    case SortOption.TopRatedFirst:
      return allOffers.toSorted((a, b) => b.rating - a.rating);
    default:
      return allOffers;
  }
}
