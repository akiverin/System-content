import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/actions/userActions";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const {
    user: currentUser,
    loading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.userId) {
      dispatch(getUser(userInfo.userId));
    }
  }, [dispatch]);

  return { currentUser, loading, error };
};

export default useCurrentUser;
