import { Given, When, Then } from '@cucumber/cucumber';
import { ActivityPage } from '../pages/ActivityPage';
import { ProfilePage } from '../pages/ProfilePage';

let activityPage: ActivityPage;
let profilePage: ProfilePage;
let activityName = 'Yoga';

Given('a logged-in user', async function () {
  // Utilisateur déjà connecté via GlobalSetup
  activityPage = new ActivityPage(this.page);
  profilePage = new ProfilePage(this.page);
});

When('the user adds an activity to favorites', async function () {
  await activityPage.goTo();
  await activityPage.addFirstActivityToFavorites();
});

Then('the activity is marked as favorite', async function () {
  await activityPage.expectActivityMarkedAsFavorite();
});

Then('it appears on the user profile', async function () {
  await profilePage.goTo();
  await profilePage.expectFavoriteActivityVisible(activityName);
});
