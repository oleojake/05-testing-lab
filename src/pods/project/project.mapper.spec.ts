import { describe, it, expect } from 'vitest';
import { mapProjectFromApiToVm } from './project.mapper';
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('project.mapper - mapProjectFromApiToVm', () => {
	it('should return an empty project when passing null', () => {
		// Arrange
		const project = null;

		// Act
		const result = mapProjectFromApiToVm(project);

		// Assert
		expect(result).toEqual(viewModel.createEmptyProject());
	});

	it('should return an empty project when passing undefined', () => {
		// Arrange
		const project = undefined;

		// Act
		const result = mapProjectFromApiToVm(project);

		// Assert
		expect(result).toEqual(viewModel.createEmptyProject());
	});

	it('should map a project correctly when passing a valid project', () => {
		// Arrange
		const apiProject: apiModel.Project = {
			id: '1',
			name: 'Test Project',
			externalId: 'EXT1',
			comments: 'Important project',
			isActive: true,
			employees: [
				{ id: 'emp1', employeeName: 'Pablo' },
				{ id: 'emp2', employeeName: 'Bones' },
			],
		};

		const expectedViewModelProject: viewModel.Project = {
			...apiProject,
			employees: [
				{ id: 'emp1', employeeName: 'Pablo' },
				{ id: 'emp2', employeeName: 'Bones' },
			],
		};

		// Act
		const result = mapProjectFromApiToVm(apiProject);

		// Assert
		expect(result).toEqual(expectedViewModelProject);
	});

	it('should map a project with empty employees list', () => {
		const apiProject: apiModel.Project = {
			id: '1',
			name: 'Empty Team',
			externalId: 'EXT1',
			comments: 'This project does not have employees',
			isActive: true,
			employees: [],
		};

		const expected: viewModel.Project = {
			...apiProject,
			employees: [],
		};

		const result = mapProjectFromApiToVm(apiProject);

		expect(result).toEqual(expected);
	});
});