import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useThunkAction = action => {
    const { categories, isLoading, error, errorMessage } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action);
    }, []);
    return { categories, isLoading, error, errorMessage };
};

export default useThunkAction;
