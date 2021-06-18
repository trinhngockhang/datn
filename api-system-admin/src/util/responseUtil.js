export const buildSuccessResponse = (data, total) => {
  return {
      data,
      code: 0,
      mess: '',
      total: total? total : 0
  }
}
