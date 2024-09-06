import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    given('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    when('the user is viewing a list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    then('the event details should be hidden.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details.', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    given('a user is viewing an event with collapsed details', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });

    when('the user clicks on the collapsed event', async () => {
      const user = userEvent.setup();
      const showDetails = EventComponent.queryByText('Show Details');
      await user.click(showDetails);
    });

    then('the event should expand to show the event details.', () => {
      const eventDetails = EventComponent.container.querySelector('.details');
      expect(eventDetails).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details.', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    given('a user is viewing an event with expanded details', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
    });

    when('the user clicks on the hide details button', async () => {
      const user = userEvent.setup();
      const hideDetails = EventComponent.queryByText('Hide Details');
      user.click(hideDetails);
    });

    then('I should see the event should collapse to hide the event details.', () => {
      const eventDetails = EventComponent.container.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});