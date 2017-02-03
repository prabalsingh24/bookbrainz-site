/*
 * Copyright (C) 2016  Ben Ockmore
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

export const ADD_IDENTIFIER_ROW = 'ADD_IDENTIFIER_ROW';
export const REMOVE_IDENTIFIER_ROW = 'REMOVE_IDENTIFIER_ROW';
export const UPDATE_IDENTIFIER_TYPE = 'UPDATE_IDENTIFIER_TYPE';
export const UPDATE_IDENTIFIER_VALUE = 'UPDATE_IDENTIFIER_VALUE';
export const HIDE_IDENTIFIER_EDITOR = 'HIDE_IDENTIFIER_EDITOR';

/**
 * Produces an action indicating that the identifier editor should be hidden
 * from view.
 *
 * @see showIdentifierEditor
 *
 * @returns {Object} The resulting HIDE_IDENTIFIER_EDITOR action.
 **/
export function hideIdentifierEditor() {
	return {
		type: HIDE_IDENTIFIER_EDITOR
	};
}

let nextIdentifierRowId = 0;

/**
 * Produces an action indicating that a row for a new identifier should be added
 * to the identifier editor. The row is assigned an ID based on an incrementing
 * variable existing on the client.
 *
 * @returns {Object} The resulting ADD_IDENTIFIER_ROW action.
 **/
export function addIdentifierRow() {
	/* Prepend 'n' here to indicate new identifier, and avoid conflicts with IDs
	 * of existing identifiers. */
	return {
		payload: `n${nextIdentifierRowId++}`,
		type: ADD_IDENTIFIER_ROW
	};
}

/**
 * Produces an action indicating that the row with the provided ID should be
 * removed from the identifier editor.
 *
 * @param {number} rowId - The ID for the row to be deleted.
 * @returns {Object} The resulting REMOVE_IDENTIFIER_ROW action.
 **/
export function removeIdentifierRow(rowId) {
	return {
		payload: rowId,
		type: REMOVE_IDENTIFIER_ROW
	};
}

/**
 * Produces an action indicating that the value for a particular identifier
 * within the editor should be updated with the provided value. Also
 * provides a suggestion for the identifier type based on the provided value,
 * if this is possible and it has not already been set. The action is marked to
 * be debounced by the keystroke debouncer defined for redux-debounce.
 *
 * @param {number} rowId - The ID of the row in the identifier editor to update.
 * @param {string} value - The new value to be used for the identifier value.
 * @param {number} suggestedType - The ID for the type suggested by the new
 *        value.
 * @returns {Object} The resulting UPDATE_IDENTIFIER_VALUE action.
 **/
export function debouncedUpdateIdentifierValue(rowId, value, suggestedType) {
	return {
		meta: {debounce: 'keystroke'},
		payload: {
			rowId,
			suggestedType,
			value
		},
		type: UPDATE_IDENTIFIER_VALUE
	};
}

/**
 * Produces an action indicating that the type for a particular identifier
 * within the editor should be updated with the provided value.
 *
 * @param {number} rowId - The ID of the row in the identifier editor to update.
 * @param {number} value - The new value to be used for the identifier type ID.
 * @returns {Object} The resulting UPDATE_IDENTIFIER_TYPE action.
 **/
export function updateIdentifierType(rowId, value) {
	return {
		payload: {
			rowId,
			value
		},
		type: UPDATE_IDENTIFIER_TYPE
	};
}