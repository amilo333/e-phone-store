import { useLocation, useParams, useSearchParams } from "react-router";

/**
 * [Hook] Get specific data in router
 * @returns Params, query, pathname & fullpath
 */
export default function useRoute() {
  // [Hook] Get param URL
  const params = useParams();
  // [Hook] Get pathname URL
  const location = useLocation();
  // [Hook] Get searchParams URL
  const [searchParams] = useSearchParams();

  // [Var] Transform query to object
  const queryObject = Object.fromEntries(searchParams.entries());

  // [Var] Transform query to string
  const queryString =
    "?" +
    Array.from(searchParams.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  return {
    params,
    query: queryObject,
    queryString: queryString,
    pathname: location.pathname,
    fullPath: `${location.pathname}${queryString}`,
  };
}
