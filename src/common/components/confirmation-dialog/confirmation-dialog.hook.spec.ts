import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup, createEmptyLookup } from '#common/models';

describe('useConfirmationDialog', () => {
	it('should initialize with dialog closed and empty item', () => {
		// Arrange
		const { result } = renderHook(() => useConfirmationDialog());

		// Assert
		expect(result.current.isOpen).toBe(false);
		expect(result.current.itemToDelete).toEqual(createEmptyLookup());
	});

	it('should open the dialog and set the item when onOpenDialog is called', () => {
		// Arrange
		const { result } = renderHook(() => useConfirmationDialog());
		const mockItem: Lookup = { id: '123', name: 'Test Item' };

		// Act
		act(() => {
			result.current.onOpenDialog(mockItem);
		});

		// Assert
		expect(result.current.isOpen).toBe(true);
		expect(result.current.itemToDelete).toEqual(mockItem);
	});

	it('should close the dialog when onClose is called', () => {
		// Arrange
		const { result } = renderHook(() => useConfirmationDialog());

		// Act
		act(() => {
			result.current.onClose();
		});

		// Assert
		expect(result.current.isOpen).toBe(false);
	});

	it('should reset itemToDelete when onAccept is called', () => {
		// Arrange
		const { result } = renderHook(() => useConfirmationDialog());
		const mockItem: Lookup = { id: '123', name: 'Test Item' };

		// Act
		act(() => {
			result.current.onOpenDialog(mockItem);
		});

		// Assert
		expect(result.current.itemToDelete).toEqual(mockItem);

		// Act
		act(() => {
			result.current.onAccept();
		});

		// Assert
		expect(result.current.itemToDelete).toEqual(createEmptyLookup());
	});

	it('should allow opening the dialog multiple times with different items', () => {
		// Arrange
		const { result } = renderHook(() => useConfirmationDialog());
		const firstItem: Lookup = { id: '123', name: 'First Item' };
		const secondItem: Lookup = { id: '456', name: 'Second Item' };

		// Act: open with first item
		act(() => {
			result.current.onOpenDialog(firstItem);
		});

		// Assert
		expect(result.current.isOpen).toBe(true);
		expect(result.current.itemToDelete).toEqual(firstItem);

		// Act: open a second without closing the first one
		act(() => {
			result.current.onOpenDialog(secondItem);
		});

		// Assert
		expect(result.current.isOpen).toBe(true);
		expect(result.current.itemToDelete).toEqual(secondItem);
	});
});
