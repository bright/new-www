export function googleTrackingIds(env: 'production' | 'staging' | 'develop') {
  const isProduction = env === 'production'
  const isStaging = env === 'staging'
  const productionGoogleTrackingIds = ['G-H4MTQGSVD3', 'AW-10942749476']
  const stagingGoogleTrackingIds = ['G-ZLZ90MP8F9']

  const googleTrackingIdsForEnv = isProduction ? productionGoogleTrackingIds : isStaging ? stagingGoogleTrackingIds : []
  return googleTrackingIdsForEnv
}
