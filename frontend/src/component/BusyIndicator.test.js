// __tests__/BusyIndicator.test.js

import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import BusyIndicator from './BusyIndicator'; // Update the import path as necessary

describe('BusyIndicator', () => {
    it('renders correctly', () => {
        const component = renderer.create(
            <BusyIndicator />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
