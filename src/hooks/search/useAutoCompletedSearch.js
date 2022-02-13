import { useMutation } from "react-query";
import { getSearchList } from "../../apis/search.instance";

const useAutoCompletedSearch = () =>
  useMutation((queryString) => getSearchList(queryString));

export default useAutoCompletedSearch;
