import { loadFeature, defineFeature } from 'jest-cucumber';
import userEvent from '@testing-library/user-event';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;
  test('Default number of events when user hasn\'t specified a number', ({ given, when, then }) => {
    given('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    when('the user hasn\'t specified the number of events', () => {
    });

    then(/^(\d+) events should be displayed by default.$/, async (arg0) => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User changes the number of events displayed', ({ given, when, then }) => {
    given('the user is viewing the events list', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      })
    });

    when('the user specifies the number of events displayed', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const NumberOfEventsComponent = AppDOM.querySelector('#numberOfEvents');
      const numberOfEventsInput = within(NumberOfEventsComponent).queryByRole('textbox');
      await user.type(numberOfEventsInput, '{backspace}{backspace}10');
    });

    then('the events list should update to show the specified number of events.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
      expect(allRenderedEventItems.length).toEqual(10);
    });
  });
});