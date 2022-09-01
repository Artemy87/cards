import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootStateType } from 'bll/store/store'

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
