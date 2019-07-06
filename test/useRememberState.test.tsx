import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useRememberState } from '../src';

const TestComponent: React.FunctionComponent = () => {
  const [data, setData] = useRememberState('testComponent', 'default');

  React.useEffect(() => {
    setData('default2');
  }, []);

  return <div>{data}</div>;
};

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TestComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
