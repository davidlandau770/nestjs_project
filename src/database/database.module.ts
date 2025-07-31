// import { Module, OnModuleInit } from '@nestjs/common';
// import { databaseService, sequelize } from './database.service';

// @Module({
//   providers: [...databaseService],
//   exports: [...databaseService],
// })
// export class DatabaseModule implements OnModuleInit {
//   async onModuleInit() {
//     try {
//       await sequelize.authenticate();
//       console.log('✅ Connection has been established successfully.');
//     } catch (err) {
//       console.error('❌ Unable to connect to the database:', err);
//     }
//   }
// }
