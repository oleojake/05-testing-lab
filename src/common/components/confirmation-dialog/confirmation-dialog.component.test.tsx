import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  const title = 'Confirm deletion';
  const content = 'Are you sure you want to delete this item?';
  const labels = {
    closeButton: 'Cancel',
    acceptButton: 'Delete',
  };

  const renderComponent = (
    isOpen = true,
    onAccept = vi.fn(),
    onClose = vi.fn()
  ) => {
    // Arrange
    render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        title={title}
        labels={labels}
      >
        {content}
      </ConfirmationDialogComponent>
    );
    return { onAccept, onClose };
  };

  it('should not render dialog when isOpen is false', () => {
    // Arrange
    renderComponent(false);

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText(content)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render dialog with title, content and buttons when open', () => {
    // Arrange
    renderComponent();

    // Assert
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: labels.closeButton })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: labels.acceptButton })
    ).toBeInTheDocument();
  });

  it('should call onClose when clicking the cancel button, and not call onAccept', async () => {
    // Arrange
    const { onClose, onAccept } = renderComponent();
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    // Act
    await userEvent.click(cancelButton);

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onAccept).not.toHaveBeenCalled();
  });

  it('should call onAccept and onClose when clicking the delete button', async () => {
    // Arrange
    const { onAccept, onClose } = renderComponent();
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    // Act
    await userEvent.click(deleteButton);

    // Assert
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
