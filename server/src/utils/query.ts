export const parseLimit = (query: { limit?: string }): number | undefined => {
  if (query.limit) {
    const limitAsInt = parseInt(query.limit)
    if (limitAsInt > 0) {
      return limitAsInt
    }
  }
}
