import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useRememberState } from '../src';

const TestComponent: React.FunctionComponent = () => {
  const [data, setData] = useRememberState('testComponent', 'default');
  const [data2, setData2] = useRememberState('testComponent2', 'default', {
    SSR: true,
  });
  React.useEffect(() => {
    setData('default2');
    setData2('default3');
  }, []);

  return (
    <div>
      {data}-{data2}
    </div>
  );
};

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TestComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
