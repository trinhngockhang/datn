export default {
  port: process.env.PORT || 3003,
  // databaseUrl: 'mysql://root:ETxGkUcEZM7M22tP5@dbmysql:3306/kecommerce?charset=utf8mb4_unicode_ci&connectionLimit=100&flags=-FOUND_ROWS',
  databaseUrl: process.env.DATABASE_URL || 'mysql://root@localhost:3306/kecommerce?charset=utf8mb4_unicode_ci&connectionLimit=100&flags=-FOUND_ROWS',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379/0',
  elasticSearchUrl: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
};
