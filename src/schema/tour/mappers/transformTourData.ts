function transformTourData(tour: any) {
  return {
    ...tour,
    accommodations: tour.accommodations.map((acc: any) => ({
      ...acc,
      stars: acc.stars as 'THREE_STAR' | 'FOUR_STAR' | 'FIVE_STAR',
    })),
  };
}
