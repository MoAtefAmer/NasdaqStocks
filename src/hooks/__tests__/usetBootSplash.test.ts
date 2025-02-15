import { renderHook } from '@testing-library/react-native';
import BootSplash from 'react-native-bootsplash';
import useBootSplash from '../useBootSplash'; // Adjust path if necessary

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValue(undefined),
}));

describe('useBootSplash', () => {
  it('should call BootSplash.hide when the hook is used', async () => {
    renderHook(() => useBootSplash());

    // Wait for the effect to complete
    expect(BootSplash.hide).toHaveBeenCalledTimes(1);
    expect(BootSplash.hide).toHaveBeenCalledWith({ fade: true });
  });
});
