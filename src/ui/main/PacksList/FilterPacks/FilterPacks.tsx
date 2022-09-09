import { useState } from 'react'

import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup'

import { setQueryParams } from '../../../../bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../../common/hooks/useAppSelector'

// eslint-disable-next-line import/namespace
import { FilterButton } from './FilterButton/FilterButton'

export const FilterPacks = () => {
  const [active, setActive] = useState(false)
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.userInfo.user._id)
  const queryParams = useAppSelector(state => state.packs.queryParams)

  const onClickHandler = (title: any) => {
    setActive(!active)
    dispatch(setQueryParams({ ...queryParams, user_id: title === 'My' ? userId : '' }))
  }

  const filterButtons = [
    <FilterButton key={'My'} state={active} title={'My'} handler={onClickHandler} />,
    <FilterButton key={'All'} state={!active} title={'All'} handler={onClickHandler} />,
  ]

  return <ButtonGroup> {filterButtons}</ButtonGroup>
}
