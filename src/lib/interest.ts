/** Where "I'm interested" buttons appear — validated on the server, reported as `location`. */
export const interestLocations = ['spotlight', 'flavour-page', 'home-where-to-buy'] as const

export type InterestLocation = (typeof interestLocations)[number]
