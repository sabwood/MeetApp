import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} setErrorAlert={() => { }} />);
  });

  test('render element with role of textbox', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toBeInTheDocument;
  });

  test('ensures the default value of the textbox is 32', () => {
    expect(NumberOfEventsComponent.getByRole('textbox')).toHaveValue('32');
  });

  test('ensures the textbox value changes according to what user types', async () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(numberOfEvents, '{backspace}{backspace}10');
    const allEvents = await getEvents();
    NumberOfEventsComponent.rerender(<NumberOfEvents setCurrentNOE={allEvents} setErrorAlert={() => { }} />);
    expect(numberOfEvents).toHaveValue('10');
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('renders a list of events matching the number selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsComponent = AppDOM.querySelector('#numberOfEvents');
    const numberOfEventsInput = within(NumberOfEventsComponent).queryByRole('textbox');

    await user.type(numberOfEventsInput, "{backspace}{backspace}10");

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    expect(allRenderedEventItems.length).toEqual(10);
  });
});