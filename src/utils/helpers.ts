import { ValidationError } from 'class-validator';
import {Doctor} from "../entity/doctor";
import {QUNO_SCORE_TEXT} from "../config/types";

/**
 * Gets the ValidationError array and returns only the constraints
 * @param {ValidationError[]} errors
 * @returns {any[]}
 */
export const getOnlyConstraints = (errors: ValidationError[]) => {
  const constraints = [];
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];
    constraints.push(error.constraints);
  }
  return constraints;
};

/**
 * Receives the data from the db and maps that on to the doctor object
 * @param data
 * @returns {Doctor[]}
 */
export const mapDoctors = (data: any) => {
  const doctors: Doctor[] = [];
  data.rows.forEach((row: any) => {
    doctors.push(new Doctor(
      row[data.names.indexOf('name')],
      row[data.names.indexOf('city')],
      row[data.names.indexOf('country')],
      row[data.names.indexOf('avatar_url')],
      parseFloat(row[data.names.indexOf('quno_score_number')]),
      parseFloat(row[data.names.indexOf('ratings_average')]),
      row[data.names.indexOf('treatments_last_year')],
      row[data.names.indexOf('years_experience')],
      parseFloat(row[data.names.indexOf('base_price')]),
      row[data.names.indexOf('slug')],
      getQunoscoreText(row[data.names.indexOf('quno_score_number')]),
      row[data.names.indexOf('id')],
    ));
  });
  return doctors;
};

/**
 * Receives the attribute name and helps to convert that to db column name
 * @param {string} name
 * @returns {string}
 */
export const getAttributeName = (name: string): string => {
  let attribute = '';
  try {
    const splitVal = name.split(/(?=[A-Z])/);
    splitVal.forEach(val => {
      attribute = attribute +
        ((val.charAt(0) === val.charAt(0).toUpperCase()) ?
          `_${val.charAt(0).toLowerCase() + val.substring(1, val.length)}` : val);
    });
  } catch (e) {
    throw e;
  }
  return attribute;
};

/**
 * Receives quno score number and returns the quno score text based on the number
 * @param {number} num
 * @returns {string}
 */
export const getQunoscoreText = (num: number): string => {
  let qunoscoreText = '';
  try {
    if (num >= 9 && num <= 10) qunoscoreText = QUNO_SCORE_TEXT.NINE_TO_TEN
    else if (num >= 8 && num < 9) qunoscoreText = QUNO_SCORE_TEXT.EIGHT_TO_NINE
    else if (num >= 7 && num < 8) qunoscoreText = QUNO_SCORE_TEXT.SEVEN_TO_EIGHT
    else if (num >= 6 && num < 7) qunoscoreText = QUNO_SCORE_TEXT.SIX_TO_SEVEN
    else if (num >= 0 && num < 6) qunoscoreText = QUNO_SCORE_TEXT.ZERO_TO_SIX
  } catch (e) {
    throw e;
  }
  return qunoscoreText;
};