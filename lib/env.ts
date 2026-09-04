/* -------------------------------------------------------------------------- */
/* ENVIRONMENTAL PHOTOGRAPHY — the places the work happens.                    */
/* Skylines, courthouses and interiors. Rendered at up to 2000px, served from  */
/* public/media/env. Portraits of Shaheen stay in lib/site.ts.                 */
/* -------------------------------------------------------------------------- */

export const env = {
  /** Allegheny County Courthouse, Pittsburgh — wide. */
  pghCourthouse: "/media/env/pgh-courthouse.jpg",
  /** Allegheny County Courthouse — tighter, lower resolution. Use small. */
  pghCourthouse2: "/media/env/pgh-courthouse-2.jpg",
  /** Pittsburgh skyline at blue hour from Mount Washington. */
  pghSkyline: "/media/env/pgh-skyline.jpg",
  /** New York County Supreme Court, Foley Square. */
  nyFoley: "/media/env/ny-foley.jpg",
  /** Downtown Los Angeles civic center at golden hour. */
  laCivic: "/media/env/la-civic.jpg",
  /** Empty courthouse corridor, marble and oak. Portrait. */
  corridor: "/media/env/corridor.jpg",
  /** Rain-wet downtown Pittsburgh street at dusk. */
  pghRain: "/media/env/pgh-rain.jpg",
  /** Desk still life: fountain pen, legal pad, leather folio. */
  desk: "/media/env/desk.jpg",
  /** Brick loft with a single leather armchair. Portrait. */
  loft: "/media/env/loft.jpg",
} as const;

/** The photograph that stands for each market, keyed by market slug. */
export const cityPhoto: Record<string, string> = {
  pittsburgh: env.pghSkyline,
  "new-york": env.nyFoley,
  "los-angeles": env.laCivic,
};

/** The three frames of the pinned film sequence on the home page. */
export const film = [env.pghRain, "/media/photos/brick-chair-wide.jpg", env.pghCourthouse] as const;
