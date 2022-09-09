import { instance } from './instances'

import { GradeType } from 'dal/api/Types/apiDataTypes'
import { UpdateGradeOfCardsResponseType } from 'dal/api/Types/apiResponseTypes'

export const gradeAPI = {
  updateGrade(data: GradeType) {
    return instance.put<UpdateGradeOfCardsResponseType>(`cards/grade`, data)
  },
}
