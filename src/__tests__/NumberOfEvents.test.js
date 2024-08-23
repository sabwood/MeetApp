import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
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
    NumberOfEventsComponent.rerender(<NumberOfEvents />);
    expect(numberOfEvents).toHaveValue('10');
  });
})