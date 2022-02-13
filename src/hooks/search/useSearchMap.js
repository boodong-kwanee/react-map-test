import { useMutation } from "react-query";
import { getSearchMap } from "../../apis/search.instance";

const useSearchMap = () =>
  useMutation((queryString) => getSearchMap(queryString));

export default useSearchMap;
