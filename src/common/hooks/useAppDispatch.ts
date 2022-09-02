import { useDispatch } from 'react-redux'

import { AppDispatch } from 'bll/store/store'

export const useAppDispatch: () => AppDispatch = useDispatch
