export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'ADj3i22*@ˆh==',
  AWS_S3_BUCKET: 'teste-festae',
  defaultRegion: 'us-east-1',
  defaultFilesACL: 'public-read-write',
  aws_access_key_id: 'AKIAQTR5ZKR34AFODUJZ',
  aws_secret_access_key: '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'
}
