import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('a user hasn\'t searched for any city', () => {

    });
    let AppComponent;
    when('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    then('the user should see a list of upcoming events from all cities.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
    let AppComponent;
    given('the main page is open', () => {
      AppComponent = render(<App />);
    });
    let CitySearchDOM;
    when('the user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, "Berlin");
    });

    then('the user should receive a list of cities (suggestions) that match what they\'ve typed.', async () => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    given('the user has typed in a city in the searchbar', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, "Berlin");
    });
    let suggestionListItems;
    and('the list of suggested cities is showing', () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2);
    });

    when('they click on a city from the suggested list', async () => {
      const user = userEvent.setup();
      await user.click(suggestionListItems[0]);
    });

    then('events for the selected city should be displayed.', async () => {
      expect(citySearchInput.value).toBe('Berlin, Germany');

      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const allEvents = await getEvents();

      const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
      expect(EventListItems).toHaveLength(berlinEvents.length);
    });
  });
});