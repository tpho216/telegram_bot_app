// Uncomment platform which you want to develop
import './render/telegram';
// import './render/facebook';
// import './render/slack';
import { runDatabaseAPIService } from './rest/index';
runDatabaseAPIService();
