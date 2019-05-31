/* eslint-disable import/no-duplicates */
import helper from '@/utils/helper'

export const formatDate = (timestamp, format = 'yyyy-MM-dd hh:mm:ss') => {
    if (!timestamp) return
    return helper.formatDate(Number(timestamp), format)
}
